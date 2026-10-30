// @vitest-environment jsdom
import { describe, expect, test } from "vitest"
import { categoryShortcutKey, isTypingTarget, resolveShortcut } from "~/utils/shortcuts"

// ショートカットをすべて有効にした設定
const options = { enabled: true, categoryNumberKeys: "oneToZero", minusTogglesEntryType: true }

function keydown(key, init = {}) {
  return new KeyboardEvent("keydown", { key, cancelable: true, ...init })
}

// ダイアログが開いているかどうかだけを返す、document の代わり
function documentWith({ dialogOpen = false } = {}) {
  return { querySelector: (selector) => (selector === "dialog[open]" && dialogOpen ? {} : null) }
}

function resolve(event, overrides = {}, doc = documentWith()) {
  return resolveShortcut(event, { ...options, ...overrides }, doc)
}

describe("categoryShortcutKey", () => {
  test("1〜0 は、1 が総合、0 がアニメとゲーム（10番目）", () => {
    expect(categoryShortcutKey(0, "oneToZero")).toBe("1")
    expect(categoryShortcutKey(8, "oneToZero")).toBe("9")
    expect(categoryShortcutKey(9, "oneToZero")).toBe("0")
  })

  test("0〜9 は、0 が総合、9 がアニメとゲーム", () => {
    expect(categoryShortcutKey(0, "zeroToNine")).toBe("0")
    expect(categoryShortcutKey(9, "zeroToNine")).toBe("9")
  })
})

describe("resolveShortcut", () => {
  test("h・n で人気・新着を選ぶ。Shift や Caps Lock で大文字になってもよい", () => {
    expect(resolve(keydown("h"))).toEqual({ type: "entryType", index: 0 })
    expect(resolve(keydown("N", { shiftKey: true }))).toEqual({ type: "entryType", index: 1 })
  })

  test("数字キーでカテゴリーを選ぶ。割り当てで変わる", () => {
    expect(resolve(keydown("1"))).toEqual({ type: "category", index: 0 })
    expect(resolve(keydown("0"))).toEqual({ type: "category", index: 9 })
    expect(resolve(keydown("0"), { categoryNumberKeys: "zeroToNine" })).toEqual({ type: "category", index: 0 })
    expect(resolve(keydown("9"), { categoryNumberKeys: "zeroToNine" })).toEqual({ type: "category", index: 9 })
  })

  test("- で人気と新着を切り替える。オプションが無効なら何もしない", () => {
    expect(resolve(keydown("-"))).toEqual({ type: "toggleEntryType" })
    expect(resolve(keydown("-"), { minusTogglesEntryType: false })).toBeNull()
  })

  test("ショートカットが無効なら何もしない", () => {
    expect(resolve(keydown("h"), { enabled: false })).toBeNull()
    expect(resolve(keydown("1"), { enabled: false })).toBeNull()
  })

  test("Ctrl・Alt・Cmd を押しているときは、ブラウザーのショートカットにまかせる", () => {
    for (const modifier of ["ctrlKey", "altKey", "metaKey"]) {
      expect(resolve(keydown("1", { [modifier]: true }))).toBeNull()
    }
  })

  test("変換中、ダイアログが開いているとき、ほかの処理がキーを使ったときは何もしない", () => {
    expect(resolve(keydown("1", { isComposing: true }))).toBeNull()
    expect(resolve(keydown("1"), {}, documentWith({ dialogOpen: true }))).toBeNull()
    const used = keydown("1")
    used.preventDefault()
    expect(resolve(used)).toBeNull()
  })

  test("入力欄で文字を入力しているときは何もしない", () => {
    const input = document.createElement("input")
    const event = keydown("1")
    Object.defineProperty(event, "target", { value: input })
    expect(resolve(event)).toBeNull()
  })

  test("ショートカットでないキーは null", () => {
    expect(resolve(keydown("a"))).toBeNull()
    expect(resolve(keydown("Enter"))).toBeNull()
  })
})

describe("isTypingTarget", () => {
  test("入力欄・テキストエリア・セレクト・編集できる要素の中なら true", () => {
    const editable = document.createElement("div")
    editable.setAttribute("contenteditable", "")
    const child = document.createElement("span")
    editable.append(child)
    for (const element of [
      document.createElement("input"),
      document.createElement("textarea"),
      document.createElement("select"),
      child,
    ]) {
      expect(isTypingTarget(element)).toBe(true)
    }
  })

  test("ボタンや本文、要素でないものなら false", () => {
    expect(isTypingTarget(document.createElement("button"))).toBe(false)
    expect(isTypingTarget(document.body)).toBe(false)
    expect(isTypingTarget(window)).toBe(false)
  })
})
