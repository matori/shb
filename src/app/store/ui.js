import { writable } from "svelte/store"
import { persisted, isBoolean } from "~/store/persisted"

const STORAGE_NAME = "simple_hatebu_ui_status"

function isIndex(value) {
  return Number.isInteger(value) && value > -1
}

const selectedCategoryTabIndex = persisted(STORAGE_NAME, "categoryTabIndex", 0, { isValid: isIndex })
const selectedTypeTabIndex = persisted(STORAGE_NAME, "typeTabIndex", 0, { isValid: isIndex })
const detailInfoExpanded = persisted(STORAGE_NAME, "detailInfoExpanded", false, { isValid: isBoolean })
const showAllBookmarks = persisted(STORAGE_NAME, "showAllBookmarks", false, { isValid: isBoolean })
const reverseOrderBookmarks = persisted(STORAGE_NAME, "reverseOrderBookmarks", false, { isValid: isBoolean })

// コメント一覧で選択中の階は、エントリーを開くたびに決まるので保存しない
const selectedBookmarksTabIndex = writable(0)

export {
  selectedCategoryTabIndex,
  selectedTypeTabIndex,
  detailInfoExpanded,
  showAllBookmarks,
  reverseOrderBookmarks,
  selectedBookmarksTabIndex,
}
