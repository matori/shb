function entries() {
  const entries = require("./data/entries.json")
  entries.last_modified = new Date()
  return entries
  // send(res, 200, entries, { "Content-Type": "application/json" })
}

module.exports = entries
