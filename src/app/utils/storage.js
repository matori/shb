// localStorageにJSONで読み書きする。使えない環境（プライベートモードなど）では何もしない
function get(key) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch {
    return null
  }
}

function set(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // 保存できなくても動作は続ける
  }
}

export default { get, set }
