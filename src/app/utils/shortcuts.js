import ENTRY_CATEGORIES from "~/constants/entryCategories"
import ENTRY_TYPES from "~/constants/entryTypes"
import { isPageKeyboardBlocked } from "~/utils/keyboard"

// エントリーの一覧のキーボードショートカット
// 判定には入力された文字（KeyboardEvent.key）だけを使い、物理キー（KeyboardEvent.code）は使わない
// 数字の段とテンキーのどちらで押しても、同じ割り当てになる

// 数字キーとカテゴリーの割り当て
// - oneToZero: キーボードの数字の段の並び（1 が総合、0 がアニメとゲーム）
// - zeroToNine: テンキーの並び（0 が総合、9 がアニメとゲーム）
const CATEGORY_NUMBER_KEYS = ["oneToZero", "zeroToNine"]

// 人気・新着のキー。表示と aria-keyshortcuts には大文字を使う
const ENTRY_TYPE_SHORTCUT_KEYS = { hotentry: "H", entrylist: "N" }

// 人気・新着を切り替えるキー（テンキーの - でも同じ文字になる）
const TOGGLE_ENTRY_TYPE_KEY = "-"

function categoryShortcutKey(categoryIndex, categoryNumberKeys) {
  return String(categoryNumberKeys === "zeroToNine" ? categoryIndex : (categoryIndex + 1) % 10)
}

function entryTypeShortcutKey(typeKey) {
  return ENTRY_TYPE_SHORTCUT_KEYS[typeKey]
}

// 入力欄などで文字を入力しているところか。そこでのキーは文字の入力として扱う
function isTypingTarget(target) {
  return (
    target instanceof Element &&
    (target.matches("input, textarea, select") || target.closest("[contenteditable]") !== null)
  )
}

// キーの操作から、ショートカットの動作を決める。ショートカットでなければ null
// - { type: "category", index }: カテゴリーを選ぶ
// - { type: "entryType", index }: 人気・新着を選ぶ
// - { type: "toggleEntryType" }: 人気と新着を切り替える
// Shift は大文字の H・N のために認め、Ctrl・Alt・Cmd はブラウザーのショートカットと重ならないよう認めない
function resolveShortcut(event, options, doc = document) {
  const { enabled, categoryNumberKeys, minusTogglesEntryType } = options
  if (!enabled || event.ctrlKey || event.altKey || event.metaKey) {
    return null
  }
  if (isPageKeyboardBlocked(event, doc) || isTypingTarget(event.target)) {
    return null
  }

  const key = event.key.toUpperCase()
  const typeIndex = ENTRY_TYPES.findIndex((type) => entryTypeShortcutKey(type.key) === key)
  if (typeIndex > -1) {
    return { type: "entryType", index: typeIndex }
  }
  const categoryIndex = ENTRY_CATEGORIES.findIndex(
    (_, index) => categoryShortcutKey(index, categoryNumberKeys) === event.key,
  )
  if (categoryIndex > -1) {
    return { type: "category", index: categoryIndex }
  }
  if (minusTogglesEntryType && event.key === TOGGLE_ENTRY_TYPE_KEY) {
    return { type: "toggleEntryType" }
  }
  return null
}

export {
  CATEGORY_NUMBER_KEYS,
  TOGGLE_ENTRY_TYPE_KEY,
  categoryShortcutKey,
  entryTypeShortcutKey,
  isTypingTarget,
  resolveShortcut,
}
