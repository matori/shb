import { readFileSync } from "node:fs"

function entries() {
  const entries = JSON.parse(readFileSync(new URL("./data/entries.json", import.meta.url), "utf-8"))
  entries.last_modified = new Date()
  return entries
}

export default entries
