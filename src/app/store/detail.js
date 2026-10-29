import { writable, derived } from "svelte/store"
import fetchJson from "~/utils/fetchJson"
import deepFreeze from "~/utils/deepFreeze"
import splitComment from "~/utils/splitComment"

const detailFetchProcessing = writable(false)
const detailFetchErrorMessage = writable("")
const detailData = detailDataStore(null)
const hasDetailData = derived(detailData, ($detailData) => !!$detailData)

function detailDataStore(initialData) {
  const { subscribe, set } = writable(initialData)

  // 取得中のリクエスト。別のエントリーを開いたり、パネルを閉じたりしたら中断して、
  // 古いレスポンスで表示が上書きされないようにする
  let controller = null

  return {
    subscribe,
    async update(itemData) {
      controller?.abort()
      const current = new AbortController()
      controller = current
      detailFetchProcessing.set(true)
      try {
        const detail = await fetchJson(
          import.meta.env.VITE_DETAIL_API,
          { url: itemData.url },
          { signal: current.signal },
        )
        if (current.signal.aborted) {
          return
        }
        const data = {
          ...addCommentTexts(detail),
          itemData: itemData,
        }
        const entries = deepFreeze(data)
        set(entries)
        detailFetchErrorMessage.set("")
      } catch (e) {
        if (current.signal.aborted) {
          return
        }
        detailFetchErrorMessage.set(e.message)
        console.error(e)
      } finally {
        if (controller === current) {
          controller = null
          detailFetchProcessing.set(false)
        }
      }
    },
    reset() {
      controller?.abort()
      controller = null
      detailFetchProcessing.set(false)
      set(null)
      detailFetchErrorMessage.set("")
    },
  }
}

function addCommentTexts(detail) {
  detail.data.entries = detail.data.entries.map((obj, floorIndex) => {
    if (!obj.content) {
      return obj
    }
    obj.content.bookmarks = obj.content.bookmarks
      .map((bookmark, index, bookmarks) => {
        const comment = bookmark.comment
        if (!comment) {
          bookmark.commentTexts = ""
          return bookmark
        }
        const commentTexts = splitComment(comment)
        const idCalls = commentTexts.reduce((result, text) => {
          if (text.type === "idCall") {
            const targetIndex = bookmarks.findIndex((bm) => bm.user === text.user)
            if (targetIndex > -1) {
              const target = bookmarks[targetIndex]
              if (!target.idCalled) {
                target.idCalled = []
              }
              target.idCalled = [...target.idCalled, bookmark.user]
            }
            result.push(text.user)
          }
          return result
        }, [])
        bookmark.commentTexts = commentTexts
        if (idCalls.length) {
          bookmark.idCalls = idCalls
        }
        return bookmark
      })
      .map((bookmark, index, bookmarks) => {
        if (bookmark.idCalls) {
          const idCalls = [...new Set(bookmark.idCalls)]
          bookmark.idCalls = idCalls.map((id) => {
            const data = bookmarks.find((bm) => bm.user === id)
            const belowData =
              floorIndex > 0
                ? detail.data.entries[floorIndex - 1].content.bookmarks.find((bm) => bm.user === id)
                : undefined
            const belowEid = belowData ? detail.data.entries[floorIndex - 1].content.eid : undefined
            if (!data) {
              return {
                user: id,
                hasBookmark: false,
                belowData,
                belowEid,
              }
            }
            data.belowData = belowData
            data.belowEid = belowEid
            return data
          })
        }
        if (bookmark.idCalled) {
          const idCalled = [...new Set(bookmark.idCalled)]
          bookmark.idCalled = idCalled.map((id) => {
            return bookmarks.find((bm) => bm.user === id)
          })
        }
        return bookmark
      })
    return obj
  })
  return detail
}

export { detailFetchProcessing, detailFetchErrorMessage, detailData, hasDetailData }
