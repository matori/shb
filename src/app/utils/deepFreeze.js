// オブジェクトを中身まで再帰的に凍結する
// 循環参照があっても止まるように、先に凍結してから、まだ凍結されていない中身をたどる
function deepFreeze(obj) {
  Object.freeze(obj)
  for (const value of Object.values(obj)) {
    if (value && typeof value === "object" && !Object.isFrozen(value)) {
      deepFreeze(value)
    }
  }
  return obj
}

export default deepFreeze
