import { createPersistedState, isBoolean } from "~/store/persisted.svelte.js"

const MIN_AUTO_REFRESH_INTERVAL_MINUTES = 5

// 基本の文字の大きさ（px）として選べる範囲。auto はブラウザーの設定に合わせる
const FONT_SIZES = Array.from({ length: 8 }, (_, index) => 13 + index)

// コンテンツの最大幅（px）。0 は画面の幅いっぱい。0 以外は、レイアウトが崩れない最小幅（global.css の --content-min-width）より狭くしない
const DEFAULT_CONTENT_MAX_WIDTH = 1920
const MIN_CONTENT_MAX_WIDTH = 960

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
  fontSize: {
    initialValue: "auto",
    isValid: (value) => value === "auto" || FONT_SIZES.includes(value),
    parse(value) {
      if (value === "auto") {
        return value
      }
      const size = Number(value)
      return FONT_SIZES.includes(size) ? size : undefined
    },
  },
  // 入力欄の文字列を数値にし、0 以外で最小幅より狭ければ最小幅にする
  contentMaxWidth: {
    initialValue: DEFAULT_CONTENT_MAX_WIDTH,
    isValid: (value) => value === 0 || (Number.isInteger(value) && value >= MIN_CONTENT_MAX_WIDTH),
    parse(value) {
      const width = parseInt(value, 10)
      if (Number.isNaN(width) || width < 0) {
        return undefined
      }
      return width === 0 ? 0 : Math.max(width, MIN_CONTENT_MAX_WIDTH)
    },
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

// 文字の大きさとコンテンツの最大幅を、<html> のスタイルに反映する
// index.html の <head> でも、描画前に同じことをしている（形を変えたら両方を直す）
function applyDisplaySettings(root, { fontSize, contentMaxWidth }) {
  if (fontSize === "auto") {
    root.style.removeProperty("font-size")
  } else {
    root.style.fontSize = `${fontSize}px`
  }
  root.style.setProperty("--content-max-width", contentMaxWidth === 0 ? "100%" : `${contentMaxWidth}px`)
}

export {
  settings,
  THEMES,
  FONT_SIZES,
  MIN_AUTO_REFRESH_INTERVAL_MINUTES,
  MIN_CONTENT_MAX_WIDTH,
  headerLinksToText,
  applyDisplaySettings,
}
