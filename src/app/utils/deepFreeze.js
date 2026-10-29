// オブジェクトを中身まで再帰的に凍結する
function deepFreeze(obj) {
  for (const value of Object.values(obj)) {
    if (value && typeof value === "object" && !Object.isFrozen(value)) {
      deepFreeze(value)
    }
  }
  return Object.freeze(obj)
}

export default deepFreeze
