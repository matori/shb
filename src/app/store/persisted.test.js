import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { createPersistedState, isBoolean } from "~/store/persisted.svelte.js"

let items

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

function saved(storageName) {
  return JSON.parse(items.get(storageName))
}

describe("createPersistedState", () => {
  test("保存値がなければ初期値を使う", () => {
    const state = createPersistedState("test", { enabled: { initialValue: false } })
    expect(state.enabled).toBe(false)
  })

  test("保存値があり、使える値ならそれを使う", () => {
    items.set("test", JSON.stringify({ enabled: true }))
    const state = createPersistedState("test", { enabled: { initialValue: false, isValid: isBoolean } })
    expect(state.enabled).toBe(true)
  })

  test("保存値が使えない値なら初期値を使う", () => {
    items.set("test", JSON.stringify({ enabled: "yes" }))
    const state = createPersistedState("test", { enabled: { initialValue: false, isValid: isBoolean } })
    expect(state.enabled).toBe(false)
  })

  test("代入すると storageKey のキーで保存し、ほかのキーの保存値は残す", () => {
    items.set("test", JSON.stringify({ other: 1 }))
    const state = createPersistedState("test", { enabled: { initialValue: false, storageKey: "oldName" } })
    state.enabled = true
    expect(state.enabled).toBe(true)
    expect(saved("test")).toEqual({ other: 1, oldName: true })
  })

  test("parse が undefined を返したら、値を変えず保存もしない", () => {
    const state = createPersistedState("test", {
      count: { initialValue: 1, parse: (value) => (value > 0 ? value : undefined) },
    })
    state.count = -1
    expect(state.count).toBe(1)
    expect(items.has("test")).toBe(false)
  })
})
