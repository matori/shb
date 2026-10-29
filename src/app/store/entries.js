import { writable, derived } from "svelte/store"
import fetchJson from "~/utils/fetchJson"
import deepFreeze from "~/utils/deepFreeze"
import sleep from "~/utils/sleep"
import ENTRY_CATEGORIES from "~/constants/entryCategories"
import ENTRY_TYPES from "~/constants/entryTypes"

// ローディング表示が一瞬で消えないように、最低限表示する時間（ミリ秒）
const MIN_LOADING_TIME = 500

const entriesFetchProcessing = writable(false)
const entriesFetchErrorMessage = writable("")

const initialEntriesData = createInitialEntriesData(true)
const entriesData = entriesDataStore(initialEntriesData)
// 一覧を一度でも取得できたか
const hasEntriesData = derived(entriesData, ($entriesData) => !!$entriesData.last_modified)

function entriesDataStore(initialData) {
  const { subscribe, set } = writable(initialData)

  return {
    subscribe,
    update: async function updateEntries(initialLoad) {
      const start = Date.now()
      entriesFetchProcessing.set(true)
      let entries
      let error
      try {
        entries = deepFreeze(await fetchJson(import.meta.env.VITE_ENTRIES_API))
      } catch (e) {
        error = e
      }
      await sleep(Math.max(0, MIN_LOADING_TIME - (Date.now() - start)))
      if (error) {
        // 初回の読み込みに失敗したときだけ一覧を空にする。読み込み済みなら前回の一覧を残す
        if (initialLoad) {
          set(createInitialEntriesData(false))
        }
        entriesFetchErrorMessage.set(error.message)
        console.error(error)
      } else {
        set(entries)
        entriesFetchErrorMessage.set("")
      }
      entriesFetchProcessing.set(false)
    },
    reset: () => set(initialData),
  }
}

function createInitialEntriesData(initializingKey) {
  const data = {}
  ENTRY_CATEGORIES.forEach((category) => {
    const categoryKey = category.key
    data[categoryKey] = {}
    ENTRY_TYPES.forEach((type) => {
      data[categoryKey][type.key] = initializingKey
        ? {
            initializing: true,
          }
        : {}
    })
  })
  return {
    last_modified: "",
    expires: "",
    data,
  }
}

export { entriesFetchProcessing, entriesFetchErrorMessage, entriesData, hasEntriesData }
