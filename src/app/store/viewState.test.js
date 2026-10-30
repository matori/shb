import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"

let items

// viewState は読み込んだときに保存値を読むので、保存値を用意してから毎回読み込み直す
async function loadViewState(saved) {
  if (saved) {
    items.set("simple_hatebu_ui_status", JSON.stringify(saved))
  }
  vi.resetModules()
  return (await import("~/store/viewState.svelte.js")).viewState
}

beforeEach(() => {
  items = new Map()
  vi.stubGlobal("localStorage", {
    getItem: (key) => items.get(key) ?? null,
    setItem: (key, value) => items.set(key, value),
  })
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe("viewState の並び順（bookmarkOrder）", () => {
  test("保存値がなければ新しい順にする", async () => {
    expect((await loadViewState()).bookmarkOrder).toBe("newest")
  })

  test("以前のバージョンで「古い順で表示」にしていたら、古い順を引き継ぐ", async () => {
    expect((await loadViewState({ reverseOrderBookmarks: true })).bookmarkOrder).toBe("oldest")
    expect((await loadViewState({ reverseOrderBookmarks: false })).bookmarkOrder).toBe("newest")
  })

  test("並び順が保存されていれば、以前のバージョンの値よりそちらを使う", async () => {
    expect((await loadViewState({ reverseOrderBookmarks: true, bookmarkOrder: "stars" })).bookmarkOrder).toBe("stars")
  })

  test("並び順にない値は、保存値でも代入でも使わない", async () => {
    const viewState = await loadViewState({ bookmarkOrder: "random" })
    expect(viewState.bookmarkOrder).toBe("newest")
    viewState.bookmarkOrder = "random"
    expect(viewState.bookmarkOrder).toBe("newest")
  })
})
