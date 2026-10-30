// 閲覧している環境のタイムゾーンで「2026/10/30 00:25:44」の形にする
// 区切り文字がブラウザーの実装で変わらないよう、formatToParts の値を組み立てる
const formatter = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
})

function formatDateTime(date, { showSeconds = true } = {}) {
  const { year, month, day, hour, minute, second } = Object.fromEntries(
    formatter.formatToParts(date).map(({ type, value }) => [type, value]),
  )
  const time = showSeconds ? `${hour}:${minute}:${second}` : `${hour}:${minute}`
  return `${year}/${month}/${day} ${time}`
}

export default formatDateTime
