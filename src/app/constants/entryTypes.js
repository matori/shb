import deepFreeze from "deep-freeze"

const types = [
  {
    key: "hotentry",
    label: "人気",
  },
  {
    key: "entrylist",
    label: "新着",
  },
]

const ENTRY_TYPES = deepFreeze(types)

export default ENTRY_TYPES
