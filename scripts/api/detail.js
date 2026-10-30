import { readdirSync, readFileSync } from "node:fs"
import createDummyDetail from "./create-dummy-detail.js"

const detailsDir = new URL("./data/details/", import.meta.url)
const FIXTURE_URL_PREFIX = "https://example.com/dummy/"

// 応答を遅らせるダミー（ミリ秒）
const DELAYS = {
  slow: 5000,
  veryslow: 90000,
}

// 本番APIの /detail と同じように、ステータスコードと本文を返す
function detail(searchParams) {
  const urls = searchParams.getAll("url")
  if (urls.length !== 1 || !urls[0]) {
    return { status: 400, body: { error: true, message: "urlパラメータが付与されていません" } }
  }

  // ?url={名前} か ?url=https://example.com/dummy/{名前} で、ダミーの振る舞いを選ぶ
  const url = urls[0]
  const name = url.startsWith(FIXTURE_URL_PREFIX) ? url.slice(FIXTURE_URL_PREFIX.length) : url
  if (name === "servererror") {
    return { status: 500, body: { error: true, message: "キャッシュの作成に失敗しました" } }
  }
  if (DELAYS[name]) {
    return { status: 200, body: createDummyDetail(), delay: DELAYS[name] }
  }
  const jsonFileName = getJsonFileName(name)
  if (jsonFileName) {
    return { status: 200, body: JSON.parse(readFileSync(new URL(jsonFileName, detailsDir), "utf-8")) }
  }

  if (!/^https?:\/\//.test(url) || url.length > 2048) {
    return { status: 400, body: { error: true, message: "urlパラメータが不正です" } }
  }
  return { status: 200, body: createDummyDetail() }
}

function getJsonFileName(fileName) {
  const dummyFiles = readdirSync(detailsDir)
  return dummyFiles.includes(`${fileName}.json`) ? `${fileName}.json` : null
}

export default detail
