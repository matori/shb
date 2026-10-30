import { createPersistedState, isBoolean } from "~/store/persisted.svelte.js"

const MIN_AUTO_REFRESH_INTERVAL_MINUTES = 5

// 表示テーマ。auto は OS の設定に従う
const THEMES = ["auto", "light", "dark"]

// 設定画面で変更できる値
// 保存キー（storageKey）は以前のバージョンと同じにして、保存済みの設定を引き継ぐ
// index.html の <head> でも theme の保存値を読んで、描画前に反映している
const settings = createPersistedState("simple_hatebu_settings", {
  theme: {
    initialValue: "auto",
    isValid: (value) => THEMES.includes(value),
    parse: (value) => (THEMES.includes(value) ? value : undefined),
  },
  autoRefreshEnabled: {
    initialValue: false,
    storageKey: "autoRefresh",
    isValid: isBoolean,
  },
  // 入力欄の文字列を数値にし、5分未満なら5分にする
  autoRefreshIntervalMinutes: {
    initialValue: 15,
    storageKey: "autoRefreshInterval",
    isValid: (value) => Number.isInteger(value) && value >= MIN_AUTO_REFRESH_INTERVAL_MINUTES,
    parse(value) {
      const minutes = parseInt(value, 10)
      return minutes ? Math.max(minutes, MIN_AUTO_REFRESH_INTERVAL_MINUTES) : undefined
    },
  },
  // ヘッダーのリンク集。設定画面のテキスト（[ラベル](URL) の行）を配列にして保存する
  headerLinks: {
    initialValue: [
      { label: "はてなブックマーク", url: "https://b.hatena.ne.jp" },
      { label: "", url: "https://x.com" },
    ],
    storageKey: "links",
    isValid: Array.isArray,
    parse: (text) => parseHeaderLinksText(text),
  },
})

function parseHeaderLinksText(text) {
  return text
    .split(/[\r\n]+/)
    .map((line) => line.match(/\[(.*?)\]\((.*?)\)/))
    .filter(Boolean)
    .map(([, label, url]) => ({ label, url }))
}

function headerLinksToText(links) {
  return links.map(({ label, url }) => `[${label}](${url})\n`).join("")
}

export { settings, THEMES, MIN_AUTO_REFRESH_INTERVAL_MINUTES, headerLinksToText }
