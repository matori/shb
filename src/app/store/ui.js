import { writable } from "svelte/store"
import store from "store"

const STORAGE_NAME = "simple_hatebu_ui_status"
const initialData = {
  selectedCategoryTabIndex: 0,
  selectedTypeTabIndex: 0,
  detailInfoExpanded: false,
  showAllBookmarks: false,
  reverseOrderBookmarks: false,
}
if (!store.get(STORAGE_NAME)) {
  store.set(STORAGE_NAME, initialData)
}

const storage = store.get(STORAGE_NAME)

const selectedCategoryTabIndex = categoryTabIndex(0)
const selectedTypeTabIndex = typeTabIndex(0)
const detailInfoExpanded = infoExpanded(false)
const showAllBookmarks = allBookmarks(false)
const reverseOrderBookmarks = reverseBookmarks(false)

const selectedBookmarksTabIndex = writable(0)

function categoryTabIndex(initialData) {
  const initial = storage.categoryTabIndex > -1 ? storage.categoryTabIndex : initialData
  const { subscribe, set } = writable(initial)

  return {
    subscribe,
    set(index) {
      const data = store.get(STORAGE_NAME)
      data.categoryTabIndex = index
      store.set(STORAGE_NAME, data)
      set(index)
    },
  }
}

function typeTabIndex(initialData) {
  const initial = storage.typeTabIndex > -1 ? storage.typeTabIndex : initialData
  const { subscribe, set } = writable(initial)

  return {
    subscribe,
    set(index) {
      const data = store.get(STORAGE_NAME)
      data.typeTabIndex = index
      store.set(STORAGE_NAME, data)
      set(index)
    },
  }
}

function infoExpanded(initialData) {
  const initial = typeof storage.detailInfoExpanded === "boolean" ? storage.detailInfoExpanded : initialData
  const { subscribe, set } = writable(initial)

  return {
    subscribe,
    set(state) {
      const data = store.get(STORAGE_NAME)
      data.detailInfoExpanded = state
      store.set(STORAGE_NAME, data)
      set(state)
    },
  }
}

function allBookmarks(initialData) {
  const initial = typeof storage.showAllBookmarks === "boolean" ? storage.showAllBookmarks : initialData
  const { subscribe, set } = writable(initial)

  return {
    subscribe,
    set(state) {
      const data = store.get(STORAGE_NAME)
      data.showAllBookmarks = state
      store.set(STORAGE_NAME, data)
      set(state)
    },
  }
}

function reverseBookmarks(initialData) {
  const initial = typeof storage.reverseOrderBookmarks === "boolean" ? storage.reverseOrderBookmarks : initialData
  const { subscribe, set } = writable(initial)

  return {
    subscribe,
    set(state) {
      const data = store.get(STORAGE_NAME)
      data.reverseOrderBookmarks = state
      store.set(STORAGE_NAME, data)
      set(state)
    },
  }
}

export {
  selectedCategoryTabIndex,
  selectedTypeTabIndex,
  detailInfoExpanded,
  showAllBookmarks,
  reverseOrderBookmarks,
  selectedBookmarksTabIndex,
}
