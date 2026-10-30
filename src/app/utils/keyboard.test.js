import { describe, expect, test } from "vitest"
import { hasModifierKey, isPageKeyboardBlocked } from "~/utils/keyboard"

function keydown(options = {}) {
  return { key: "Escape", altKey: false, ctrlKey: false, metaKey: false, shiftKey: false, ...options }
}

// ダイアログが開いているかどうかだけを返す、document の代わり
function documentWith({ dialogOpen = false } = {}) {
  return { querySelector: (selector) => (selector === "dialog[open]" && dialogOpen ? {} : null) }
}

describe("hasModifierKey", () => {
  test("Alt・Ctrl・Meta（Cmd）・Shift のどれかを押していれば true", () => {
    expect(hasModifierKey(keydown())).toBe(false)
    for (const key of ["altKey", "ctrlKey", "metaKey", "shiftKey"]) {
      expect(hasModifierKey(keydown({ [key]: true }))).toBe(true)
    }
  })
})

describe("isPageKeyboardBlocked", () => {
  test("ふだんは受けつける", () => {
    expect(isPageKeyboardBlocked(keydown({ defaultPrevented: false, isComposing: false }), documentWith())).toBe(false)
  })

  test("ほかの処理がキーを使ったときは受けつけない", () => {
    expect(isPageKeyboardBlocked(keydown({ defaultPrevented: true }), documentWith())).toBe(true)
  })

  test("日本語の入力で変換している途中は受けつけない", () => {
    expect(isPageKeyboardBlocked(keydown({ isComposing: true }), documentWith())).toBe(true)
  })

  test("モーダルのダイアログが開いているときは受けつけない", () => {
    expect(isPageKeyboardBlocked(keydown(), documentWith({ dialogOpen: true }))).toBe(true)
  })
})
