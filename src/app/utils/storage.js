// localStorageにJSONで読み書きする
// localStorageが使えない環境（ブロックされている場合など）では、ページを開いている間だけメモリーに保存する
const memory = new Map()

function get(key) {
  let text
  try {
    text = localStorage.getItem(key)
  } catch {
    text = memory.get(key) ?? null
  }
  try {
    return JSON.parse(text)
  } catch {
    // 保存値が壊れている場合は、保存されていないものとして扱う
    return null
  }
}

function set(key, value) {
  const text = JSON.stringify(value)
  try {
    localStorage.setItem(key, text)
  } catch {
    memory.set(key, text)
  }
}

export default { get, set }
