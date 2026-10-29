import { persisted, isBoolean } from "~/store/persisted"

const STORAGE_NAME = "simple_hatebu_settings"
const MIN_AUTO_REFRESH_INTERVAL = 5

// 表示テーマ。auto は OS の設定に従う。index.html の <head> でも同じ保存値を読んで、描画前に反映している
const THEMES = ["auto", "light", "dark"]
const theme = persisted(STORAGE_NAME, "theme", "auto", {
  isValid: (value) => THEMES.includes(value),
  parse: (value) => (THEMES.includes(value) ? value : undefined),
})

const autoRefresh = persisted(STORAGE_NAME, "autoRefresh", false, { isValid: isBoolean })

// 自動更新の間隔（分）。入力欄の文字列を数値にし、5分未満なら5分にする
const autoRefreshInterval = persisted(STORAGE_NAME, "autoRefreshInterval", 15, {
  isValid: (value) => value > -1,
  parse(value) {
    const num = parseInt(value, 10)
    return num ? Math.max(num, MIN_AUTO_REFRESH_INTERVAL) : undefined
  },
})

// ヘッダーのリンク集。設定画面のテキスト（[ラベル](URL) の行）を配列にして保存する
const links = persisted(
  STORAGE_NAME,
  "links",
  [
    {
      label: "はてなブックマーク",
      url: "https://b.hatena.ne.jp",
    },
    {
      label: "",
      url: "https://x.com",
    },
  ],
  { isValid: Array.isArray, parse: (text) => parseLinks(text.trim()) },
)

function parseLinks(value) {
  const lines = value.split(/[\r\n]+/)
  return lines.reduce((result, line) => {
    const matches = line.match(/\[(.*?)\]\((.*?)\)/)
    if (matches) {
      result.push({
        label: matches[1],
        url: matches[2],
      })
    }
    return result
  }, [])
}

export { theme, autoRefresh, autoRefreshInterval, links }
