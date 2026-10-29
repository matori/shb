// ダミーAPIのデータが、本番APIのJSONスキーマ（schema/*.schema.json）に沿っているかを検証する
import { readdirSync, readFileSync } from "node:fs"
import Ajv from "ajv/dist/2020.js"
import addFormats from "ajv-formats"
import entries from "./api/entries.js"
import detail from "./api/detail.js"

const GENERATED_COUNT = 300

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)

function compile(name) {
  return ajv.compile(JSON.parse(readFileSync(new URL(`../schema/${name}`, import.meta.url), "utf-8")))
}

const validators = {
  entries: compile("entries.schema.json"),
  detail: compile("detail.schema.json"),
  error: compile("error.schema.json"),
}

let failed = 0

function check(label, validate, data) {
  if (validate(data)) {
    return
  }
  failed += 1
  console.error(`✗ ${label}`)
  for (const error of validate.errors.slice(0, 5)) {
    console.error(`    ${error.instancePath || "/"} ${error.message}`)
  }
}

// 本番APIと同じく、200なら各スキーマ、それ以外ならエラーのスキーマで検証する
function checkResponse(label, schemaName, { status, body }) {
  check(`${label} (${status})`, status === 200 ? validators[schemaName] : validators.error, body)
}

checkResponse("entries", "entries", entries(new URLSearchParams()))
checkResponse("entries?servererror", "entries", entries(new URLSearchParams("servererror")))

const detailsDir = new URL("./api/data/details/", import.meta.url)
for (const file of readdirSync(detailsDir).filter((file) => file.endsWith(".json"))) {
  const name = file.replace(/\.json$/, "")
  checkResponse(`detail?url=${name}`, "detail", detail(new URLSearchParams({ url: name })))
}
for (const query of ["", "url=", "url=ftp://example.com/", "url=servererror"]) {
  checkResponse(`detail?${query}`, "detail", detail(new URLSearchParams(query)))
}
for (let i = 0; i < GENERATED_COUNT; i++) {
  checkResponse(`detail（自動生成 ${i + 1}）`, "detail", detail(new URLSearchParams({ url: "https://example.com/" })))
}

if (failed) {
  console.error(`\n${failed}件がスキーマに沿っていません`)
  process.exit(1)
}
console.log("すべてのダミーデータがスキーマに沿っています")
