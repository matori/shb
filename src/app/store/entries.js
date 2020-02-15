import { writable } from "svelte/store"
import axios from "axios"
import deepFreeze from "deep-freeze"
import sleep from "~/utils/sleep"
import ENTRY_CATEGORIES from "~/constants/entryCategories"
import ENTRY_TYPES from "~/constants/entryTypes"

const entriesFetchProcessing = writable(false)
const entriesFetchErrorMessage = writable("")

const initialEntriesData = createInitialEntriesData(true)
const entriesData = entriesDataStore(initialEntriesData)

function entriesDataStore(initialData) {
  const { subscribe, set } = writable(initialData)

  return {
    subscribe,
    update: async function updateEntries(initialLoad) {
      const start = Date.now()
      entriesFetchProcessing.set(true)
      try {
        const response = await axios.get(process.env.ENTRIES_API)
        const entries = deepFreeze(response.data)
        const elapsed = Date.now() - start
        if (elapsed < 1000) {
          await sleep(500 - elapsed)
        }
        set(entries)
        entriesFetchErrorMessage.set("")
      } catch (e) {
        const elapsed = Date.now() - start
        if (elapsed < 500) {
          await sleep(500 - elapsed)
        }
        if (initialLoad) {
          set(createInitialEntriesData(false))
        }
        entriesFetchErrorMessage.set(e.message)
        console.error(e)
      }
      entriesFetchProcessing.set(false)
    },
    reset: () => set(initialData),
  }
}

function createInitialEntriesData(initializingKey) {
  const data = {}
  ENTRY_CATEGORIES.forEach(category => {
    const categoryKey = category.key
    data[categoryKey] = {}
    ENTRY_TYPES.forEach(type => {
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

export { entriesFetchProcessing, entriesFetchErrorMessage, entriesData }
