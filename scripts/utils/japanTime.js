// 本番APIと同じく、日本時間の日時の文字列を作る。ダミーAPIは Node.js で動くので Temporal を使う
const TIME_ZONE = "Asia/Tokyo"

// 今の日本時間。秒より細かい部分は切り捨てる
function nowInJapan() {
  return Temporal.Now.zonedDateTimeISO(TIME_ZONE).round({ smallestUnit: "second", roundingMode: "trunc" })
}

// Date を日本時間にする
function dateToJapanTime(date) {
  return Temporal.Instant.fromEpochMilliseconds(date.getTime()).toZonedDateTimeISO(TIME_ZONE)
}

// 「2026-10-30T14:24:54+09:00」の形（last_modified・expires など）
function toApiDateTime(zonedDateTime) {
  return zonedDateTime.toString({ smallestUnit: "second", timeZoneName: "never" })
}

// 「2019/12/13 17:47」の形（ブックマークの timestamp）
function toBookmarkTimestamp(zonedDateTime) {
  const { year, month, day, hour, minute } = zonedDateTime
  const pad = (number) => String(number).padStart(2, "0")
  return `${year}/${pad(month)}/${pad(day)} ${pad(hour)}:${pad(minute)}`
}

export { nowInJapan, dateToJapanTime, toApiDateTime, toBookmarkTimestamp }
