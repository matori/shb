import { readdirSync, readFileSync } from "node:fs"
import createDummyDetail from "./create-dummy-detail.js"

const detailsDir = new URL("./data/details/", import.meta.url)

function detail(searchParams) {
  const jsonFileName = getJsonFileName(searchParams.get("url"))
  return jsonFileName ? JSON.parse(readFileSync(new URL(jsonFileName, detailsDir), "utf-8")) : createDummyDetail()
}

function getJsonFileName(fileName) {
  const dummyFiles = readdirSync(detailsDir)
  const fileExist = fileName ? dummyFiles.includes(`${fileName}.json`) : false
  return fileExist ? `${fileName}.json` : null
}

export default detail
