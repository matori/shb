// はてなスターの色と、読み上げに使う名前。表示もこの順に並べる
const STAR_COLORS = [
  { key: "yellow", label: "黄色" },
  { key: "green", label: "緑" },
  { key: "red", label: "赤" },
  { key: "blue", label: "青" },
  { key: "purple", label: "紫" },
]

// スターの数を文字で表す（読み上げとツールチップに使う）
// 黄色だけなら「スター 3個」、ほかの色もあれば「スター 109個（黄色 106、赤 2、青 1）」
function describeStars({ total, colors }) {
  const counts = STAR_COLORS.filter(({ key }) => colors[key]).map(({ key, label }) => `${label} ${colors[key]}`)
  const onlyYellow = Object.keys(colors).every((key) => key === "yellow")
  return onlyYellow ? `スター ${total}個` : `スター ${total}個（${counts.join("、")}）`
}

export { STAR_COLORS, describeStars }
