import { readFileSync } from "node:fs"
import dayjs from "dayjs"

// 本番APIの /entries と同じように、ステータスコードと本文を返す
function entries(searchParams) {
  if (searchParams.has("servererror")) {
    return { status: 500, body: { error: true, message: "キャッシュの作成に失敗しました" } }
  }
  const entries = JSON.parse(readFileSync(new URL("./data/entries.json", import.meta.url), "utf-8"))
  entries.last_modified = dayjs().format()
  entries.expires = dayjs().add(5, "minute").format()
  return { status: 200, body: entries }
}

export default entries
