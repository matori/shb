import storage from "~/utils/storage"

// localStorage の storageName の項目に、オブジェクトとしてまとめて保存される状態
// definitions のキーが、返すオブジェクトのプロパティ名になる。代入すると保存される
// - initialValue: 保存値がないとき、使えないときの値
// - storageKey: 保存するときのキー。省略するとプロパティ名と同じ
// - isValid: 保存値が使えるかどうか
// - parse: 代入された値を保存する形に変換する。undefined を返すと保存しない
function createPersistedState(storageName, definitions) {
  const saved = storage.get(storageName) ?? {}
  const values = $state({})
  const state = {}

  for (const [name, definition] of Object.entries(definitions)) {
    const { initialValue, storageKey = name, isValid = () => true, parse = (value) => value } = definition
    const savedValue = saved[storageKey]
    values[name] = savedValue !== undefined && isValid(savedValue) ? savedValue : initialValue

    Object.defineProperty(state, name, {
      enumerable: true,
      get: () => values[name],
      set(value) {
        const parsed = parse(value)
        if (parsed === undefined) {
          return
        }
        values[name] = parsed
        storage.set(storageName, { ...storage.get(storageName), [storageKey]: $state.snapshot(parsed) })
      },
    })
  }

  return state
}

function isBoolean(value) {
  return typeof value === "boolean"
}

export { createPersistedState, isBoolean }
