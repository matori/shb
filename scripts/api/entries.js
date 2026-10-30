import { readFileSync } from "node:fs"
import { nowInJapan, toApiDateTime } from "../utils/japanTime.js"

// 本番APIの /entries と同じように、ステータスコードと本文を返す
function entries(searchParams) {
  if (searchParams.has("servererror")) {
    return { status: 500, body: { error: true, message: "キャッシュの作成に失敗しました" } }
  }
  const entries = JSON.parse(readFileSync(new URL("./data/entries.json", import.meta.url), "utf-8"))
  const now = nowInJapan()
  entries.last_modified = toApiDateTime(now)
  entries.expires = toApiDateTime(now.add({ minutes: 5 }))
  return { status: 200, body: entries }
}

export default entries
