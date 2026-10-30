import { createPersistedState, isBoolean } from "~/store/persisted.svelte.js"

function isIndex(value) {
  return Number.isInteger(value) && value > -1
}

// 画面の表示状態。次に開いたときも同じ状態で表示する
// 保存キー（storageKey）は以前のバージョンと同じにして、保存済みの状態を引き継ぐ
const viewState = createPersistedState("simple_hatebu_ui_status", {
  selectedCategoryIndex: { initialValue: 0, storageKey: "categoryTabIndex", isValid: isIndex },
  selectedEntryTypeIndex: { initialValue: 0, storageKey: "typeTabIndex", isValid: isIndex },
  entryInfoExpanded: { initialValue: false, storageKey: "detailInfoExpanded", isValid: isBoolean },
  includeBookmarksWithoutComment: { initialValue: false, storageKey: "showAllBookmarks", isValid: isBoolean },
  showOldestBookmarksFirst: { initialValue: false, storageKey: "reverseOrderBookmarks", isValid: isBoolean },
})

export { viewState }
