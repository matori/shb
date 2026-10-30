import fetchJson from "~/utils/fetchJson"
import deepFreeze from "~/utils/deepFreeze"
import sleep from "~/utils/sleep"
import ENTRY_CATEGORIES from "~/constants/entryCategories"
import ENTRY_TYPES from "~/constants/entryTypes"

// ローディング表示が一瞬で消えないように、最低限表示する時間（ミリ秒）
const MIN_LOADING_TIME = 500

// 全カテゴリーの人気・新着エントリーの一覧（entries API）
class EntryFeeds {
  // APIのレスポンス。読み込む前は、各フィードが { initializing: true } の仮のデータ
  response = $state.raw(createPlaceholderResponse({ initializing: true }))
  isLoading = $state(false)
  errorMessage = $state("")
  // 一覧を一度でも取得できたか
  hasLoaded = $derived(!!this.response.last_modified)

  async load({ isInitialLoad = false } = {}) {
    const start = Date.now()
    this.isLoading = true
    let response
    let error
    try {
      response = deepFreeze(await fetchJson(import.meta.env.VITE_ENTRIES_API))
    } catch (e) {
      error = e
    }
    await sleep(Math.max(0, MIN_LOADING_TIME - (Date.now() - start)))
    if (error) {
      // 初回の読み込みに失敗したときだけ一覧を空にする。読み込み済みなら前回の一覧を残す
      if (isInitialLoad) {
        this.response = createPlaceholderResponse({})
      }
      this.errorMessage = error.message
      console.error(error)
    } else {
      this.response = response
      this.errorMessage = ""
    }
    this.isLoading = false
  }

  feed(categoryKey, typeKey) {
    return this.response.data[categoryKey][typeKey]
  }
}

function createPlaceholderResponse(feed) {
  const data = {}
  for (const category of ENTRY_CATEGORIES) {
    data[category.key] = {}
    for (const type of ENTRY_TYPES) {
      data[category.key][type.key] = feed
    }
  }
  return { last_modified: "", expires: "", data }
}

const entryFeeds = new EntryFeeds()

export { entryFeeds }
