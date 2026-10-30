import { afterEach, describe, expect, test, vi } from "vitest"
import storage from "~/utils/storage"

function createLocalStorage(initial = {}) {
  const items = new Map(Object.entries(initial))
  return {
    getItem: (key) => items.get(key) ?? null,
    setItem: (key, value) => items.set(key, String(value)),
    items,
  }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe("storage", () => {
  test("localStorage に JSON で読み書きする", () => {
    const localStorage = createLocalStorage()
    vi.stubGlobal("localStorage", localStorage)
    storage.set("key", { a: 1 })
    expect(localStorage.items.get("key")).toBe('{"a":1}')
    expect(storage.get("key")).toEqual({ a: 1 })
  })

  test("保存されていないときと、保存値が壊れているときは null を返す", () => {
    vi.stubGlobal("localStorage", createLocalStorage({ broken: "{" }))
    expect(storage.get("missing")).toBeNull()
    expect(storage.get("broken")).toBeNull()
  })

  test("localStorage が使えないときは、メモリーに保存する", () => {
    vi.stubGlobal("localStorage", {
      getItem() {
        throw new Error("blocked")
      },
      setItem() {
        throw new Error("blocked")
      },
    })
    storage.set("memoryKey", [1, 2])
    expect(storage.get("memoryKey")).toEqual([1, 2])
  })
})
