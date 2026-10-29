import { writable } from "svelte/store"
import storage from "~/utils/storage"

// localStorageの storageName の項目に、オブジェクトの key として保存されるstore
// - isValid: 保存値が使えるかどうか。使えなければ初期値になる
// - parse: set() に渡された値を保存する形に変換する。undefined を返すと保存しない
function persisted(storageName, key, initialValue, { isValid = () => true, parse = (value) => value } = {}) {
  const saved = storage.get(storageName)?.[key]
  const { subscribe, set } = writable(saved !== undefined && isValid(saved) ? saved : initialValue)

  return {
    subscribe,
    set(value) {
      const parsed = parse(value)
      if (parsed === undefined) {
        return
      }
      storage.set(storageName, { ...storage.get(storageName), [key]: parsed })
      set(parsed)
    },
  }
}

function isBoolean(value) {
  return typeof value === "boolean"
}

export { persisted, isBoolean }
