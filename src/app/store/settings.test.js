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

describe("文字の大きさ（fontSize）", () => {
  test("初期値はブラウザーの設定に合わせる（auto）", async () => {
    const { settings } = await loadSettings()
    expect(settings.fontSize).toBe("auto")
  })

  test("13〜20px を、<select> の文字列からも数値にして保存する", async () => {
    const { settings } = await loadSettings()
    settings.fontSize = "20"
    expect(settings.fontSize).toBe(20)
    settings.fontSize = "auto"
    expect(settings.fontSize).toBe("auto")
    expect(JSON.parse(items.get("simple_hatebu_settings")).fontSize).toBe("auto")
  })

  test("範囲の外の値は、保存値でも代入でも使わない", async () => {
    const { settings } = await loadSettings({ fontSize: 30 })
    expect(settings.fontSize).toBe("auto")
    settings.fontSize = "12"
    expect(settings.fontSize).toBe("auto")
  })
})

describe("コンテンツの最大幅（contentMaxWidth）", () => {
  test("初期値は CSS と同じ 1920", async () => {
    const { settings } = await loadSettings()
    expect(settings.contentMaxWidth).toBe(1920)
  })

  test("0 は画面の幅いっぱい、最小幅より狭い値は最小幅にする", async () => {
    const { settings } = await loadSettings()
    settings.contentMaxWidth = "0"
    expect(settings.contentMaxWidth).toBe(0)
    settings.contentMaxWidth = "500"
    expect(settings.contentMaxWidth).toBe(960)
    settings.contentMaxWidth = "1280"
    expect(settings.contentMaxWidth).toBe(1280)
  })

  test("数でない値と負の値は使わない", async () => {
    const { settings } = await loadSettings({ contentMaxWidth: 500 })
    expect(settings.contentMaxWidth).toBe(1920)
    settings.contentMaxWidth = ""
    settings.contentMaxWidth = "-1"
    expect(settings.contentMaxWidth).toBe(1920)
  })
})

describe("applyDisplaySettings", () => {
  function createRoot() {
    const properties = new Map()
    return {
      properties,
      style: {
        setProperty: (name, value) => properties.set(name, value),
        removeProperty: (name) => properties.delete(name),
        set fontSize(value) {
          properties.set("font-size", value)
        },
      },
    }
  }

  test("文字の大きさと最大幅を <html> のスタイルに入れ、最大幅が 0 なら 100% にする", async () => {
    const { applyDisplaySettings } = await loadSettings()
    const root = createRoot()
    applyDisplaySettings(root, { fontSize: 18, contentMaxWidth: 0 })
    expect(Object.fromEntries(root.properties)).toEqual({ "font-size": "18px", "--content-max-width": "100%" })
  })

  test("auto なら文字の大きさの指定を外し、CSS（ブラウザーの設定）に戻す", async () => {
    const { applyDisplaySettings } = await loadSettings()
    const root = createRoot()
    applyDisplaySettings(root, { fontSize: 18, contentMaxWidth: 1280 })
    applyDisplaySettings(root, { fontSize: "auto", contentMaxWidth: 1280 })
    expect(Object.fromEntries(root.properties)).toEqual({ "--content-max-width": "1280px" })
  })
})
