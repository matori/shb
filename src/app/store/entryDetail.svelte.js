import fetchJson from "~/utils/fetchJson"
import deepFreeze from "~/utils/deepFreeze"
import parseComment from "~/utils/parseComment"

// 一覧で選んだエントリーの詳細（detail API）。エントリー情報とコメント一覧のパネルに表示する
class EntryDetail {
  // 一覧で選んだエントリー（entries API の items の1件）
  entry = $state.raw(null)
  // detail API のレスポンス
  response = $state.raw(null)
  isLoading = $state(false)
  errorMessage = $state("")
  // コメント一覧で選択中の階（0始まり）
  selectedFloorIndex = $state(0)
  isOpen = $derived(!!this.response || !!this.errorMessage)

  // 取得中のリクエスト。別のエントリーを開いたり、パネルを閉じたりしたら中断して、
  // 古いレスポンスで表示が上書きされないようにする
  #controller = null

  async open(entry) {
    this.#controller?.abort()
    const controller = new AbortController()
    this.#controller = controller
    this.isLoading = true
    try {
      const response = await fetchJson(
        import.meta.env.VITE_DETAIL_API,
        { url: entry.url },
        { signal: controller.signal },
      )
      if (controller.signal.aborted) {
        return
      }
      this.entry = entry
      this.response = deepFreeze(addCommentDetails(response))
      // ブックマークページを指定した場合は、その階を選んだ状態で開く
      this.selectedFloorIndex = response.data.floor - 1
      this.errorMessage = ""
    } catch (e) {
      if (controller.signal.aborted) {
        return
      }
      this.errorMessage = e.message
      console.error(e)
    } finally {
      if (this.#controller === controller) {
        this.#controller = null
        this.isLoading = false
      }
    }
  }

  close() {
    this.#controller?.abort()
    this.#controller = null
    this.isLoading = false
    this.entry = null
    this.response = null
    this.errorMessage = ""
  }
}

// 各ブックマークに、記法ごとに分けたコメント（commentParts）と、IDコールの関係を加える
// - idCallsTo: このブックマークのコメントでIDコールしたユーザー。同じ階のブックマークと、下の階のブックマーク
// - idCalledBy: このブックマークのユーザーをIDコールした、同じ階のブックマーク
function addCommentDetails(response) {
  const floors = response.data.entries
  floors.forEach((floor, floorIndex) => {
    if (!floor.content) {
      return
    }
    const bookmarks = floor.content.bookmarks
    const lowerFloor = floorIndex > 0 ? floors[floorIndex - 1].content : null
    // 処理の途中でだけ使う、表示とは関係のない Map と Set なので、リアクティブにしなくてよい
    // eslint-disable-next-line svelte/prefer-svelte-reactivity
    const bookmarksByUser = new Map(bookmarks.map((bookmark) => [bookmark.user, bookmark]))

    for (const bookmark of bookmarks) {
      bookmark.commentParts = bookmark.comment ? parseComment(bookmark.comment) : []
    }

    for (const bookmark of bookmarks) {
      // eslint-disable-next-line svelte/prefer-svelte-reactivity
      const calledUsers = new Set(
        bookmark.commentParts.filter((part) => part.type === "idCall").map((part) => part.user),
      )
      if (!calledUsers.size) {
        continue
      }
      bookmark.idCallsTo = [...calledUsers].map((user) => ({
        user,
        bookmark: bookmarksByUser.get(user) ?? null,
        lowerFloorBookmark: lowerFloor?.bookmarks.find((lowerBookmark) => lowerBookmark.user === user) ?? null,
        lowerFloorEid: lowerFloor?.eid,
      }))
      for (const user of calledUsers) {
        const calledBookmark = bookmarksByUser.get(user)
        if (calledBookmark) {
          calledBookmark.idCalledBy ??= []
          calledBookmark.idCalledBy.push(bookmark)
        }
      }
    }
  })
  return response
}

const entryDetail = new EntryDetail()

export { entryDetail, addCommentDetails }
