import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"

let items

// settings は読み込んだときに保存値を読むので、保存値を用意してから毎回読み込み直す
async function loadSettings(savedSettings) {
  if (savedSettings) {
    items.set("simple_hatebu_settings", JSON.stringify(savedSettings))
  }
  vi.resetModules()
  return import("~/store/settings.svelte.js")
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

describe("settings", () => {
  test("以前のバージョンの保存キーから読み込む", async () => {
    const { settings } = await loadSettings({
      theme: "dark",
      autoRefresh: true,
      autoRefreshInterval: 30,
      links: [{ label: "テスト", url: "https://example.com" }],
    })
    expect(settings.theme).toBe("dark")
    expect(settings.autoRefreshEnabled).toBe(true)
    expect(settings.autoRefreshIntervalMinutes).toBe(30)
    expect(settings.headerLinks).toEqual([{ label: "テスト", url: "https://example.com" }])
  })

  test("以前のバージョンの保存キーで保存する", async () => {
    const { settings } = await loadSettings()
    settings.autoRefreshEnabled = true
    settings.autoRefreshIntervalMinutes = "20"
    settings.headerLinks = "[テスト](https://example.com)"
    expect(JSON.parse(items.get("simple_hatebu_settings"))).toEqual({
      autoRefresh: true,
      autoRefreshInterval: 20,
      links: [{ label: "テスト", url: "https://example.com" }],
    })
  })

  test("表示テーマは auto・light・dark 以外を受けつけない", async () => {
    const { settings } = await loadSettings({ theme: "sepia" })
    expect(settings.theme).toBe("auto")
    settings.theme = "sepia"
    expect(settings.theme).toBe("auto")
  })

  test("自動更新間隔は5分未満なら5分にし、数でなければ変えない", async () => {
    const { settings } = await loadSettings()
    settings.autoRefreshIntervalMinutes = "3"
    expect(settings.autoRefreshIntervalMinutes).toBe(5)
    settings.autoRefreshIntervalMinutes = ""
    expect(settings.autoRefreshIntervalMinutes).toBe(5)
  })

  test("リンク集のテキストは [ラベル](URL) の行だけを取り出し、テキストに戻せる", async () => {
    const { settings, headerLinksToText } = await loadSettings()
    settings.headerLinks = "[はてな](https://b.hatena.ne.jp)\n関係ない行\r\n[](https://x.com)\n"
    expect(settings.headerLinks).toEqual([
      { label: "はてな", url: "https://b.hatena.ne.jp" },
      { label: "", url: "https://x.com" },
    ])
    expect(headerLinksToText(settings.headerLinks)).toBe("[はてな](https://b.hatena.ne.jp)\n[](https://x.com)\n")
  })
})
