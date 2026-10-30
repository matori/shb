import storage from "~/utils/storage"
import { BOOKMARK_ORDERS } from "~/utils/sortBookmarks"
import { createPersistedState, isBoolean } from "~/store/persisted.svelte.js"

const STORAGE_NAME = "simple_hatebu_ui_status"

function isIndex(value) {
  return Number.isInteger(value) && value > -1
}

function isBookmarkOrder(value) {
  return BOOKMARK_ORDERS.some((order) => order.value === value)
}

// 以前のバージョンの「古い順で表示」（reverseOrderBookmarks）を、並び順の初期値として引き継ぐ
function legacyBookmarkOrder() {
  return storage.get(STORAGE_NAME)?.reverseOrderBookmarks === true ? "oldest" : "newest"
}

// 画面の表示状態。次に開いたときも同じ状態で表示する
// 保存キー（storageKey）は以前のバージョンと同じにして、保存済みの状態を引き継ぐ
const viewState = createPersistedState(STORAGE_NAME, {
  selectedCategoryIndex: { initialValue: 0, storageKey: "categoryTabIndex", isValid: isIndex },
  selectedEntryTypeIndex: { initialValue: 0, storageKey: "typeTabIndex", isValid: isIndex },
  entryInfoExpanded: { initialValue: false, storageKey: "detailInfoExpanded", isValid: isBoolean },
  includeBookmarksWithoutComment: { initialValue: false, storageKey: "showAllBookmarks", isValid: isBoolean },
  bookmarkOrder: {
    initialValue: legacyBookmarkOrder(),
    isValid: isBookmarkOrder,
    parse: (value) => (isBookmarkOrder(value) ? value : undefined),
  },
})

export { viewState }
