import { writable } from "svelte/store"
import store from "store"

const STORAGE_NAME = "simple_hatebu_settings"
const initialData = {
  autoRefresh: false,
  autoRefreshInterval: 15,
  links: [
    {
      label: "はてなブックマーク",
      url: "https://b.hatena.ne.jp",
    },
    {
      label: "",
      url: "https://twitter.com",
    },
  ],
}

if (!store.get(STORAGE_NAME)) {
  store.set(STORAGE_NAME, initialData)
}

const storage = store.get(STORAGE_NAME)

const autoRefresh = autoRefreshSetting(initialData.autoRefresh)
const autoRefreshInterval = autoRefreshIntervalSetting(initialData.autoRefreshInterval)
const links = linksSetting(initialData.links)

function autoRefreshSetting(initialData) {
  const initial = typeof storage.autoRefresh === "boolean" ? storage.autoRefresh : initialData
  const { subscribe, set } = writable(initial)

  return {
    subscribe,
    set(value) {
      const data = store.get(STORAGE_NAME)
      data.autoRefresh = value
      store.set(STORAGE_NAME, data)
      set(value)
    },
  }
}

function autoRefreshIntervalSetting(initialData) {
  const initial = storage.autoRefreshInterval > -1 ? storage.autoRefreshInterval : initialData
  const { subscribe, set } = writable(initial)

  return {
    subscribe,
    set(value) {
      const num = parseInt(value, 10)
      if (!num) {
        return
      }
      const data = store.get(STORAGE_NAME)
      const interval = num < 5 ? 5 : num
      data.autoRefreshInterval = interval
      store.set(STORAGE_NAME, data)
      set(interval)
    },
  }
}

function linksSetting(initialData) {
  const initial = Array.isArray(storage.links) ? storage.links : initialData
  const { subscribe, set } = writable(initial)

  return {
    subscribe,
    set(value) {
      const data = store.get(STORAGE_NAME)
      const formatData = parseLinks(value.trim())
      data.links = formatData
      store.set(STORAGE_NAME, data)
      set(formatData)
    },
  }
}

function parseLinks(value) {
  const lines = value.split(/[\r\n]+/)
  return lines.reduce((result, line) => {
    const matches = line.match(/\[(.*?)\]\((.*?)\)/)
    if (matches) {
      result.push({
        label: matches[1],
        url: matches[2],
      })
    }
    return result
  }, [])
}

export { autoRefresh, autoRefreshInterval, links }
