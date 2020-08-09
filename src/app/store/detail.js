import { writable, derived } from "svelte/store"
import axios from "axios"
import deepFreeze from "deep-freeze"
import uniq from "lodash/uniq"
import splitComment from "~/utils/splitComment"

const detailFetchProcessing = writable(false)
const detailFetchErrorMessage = writable("")
const detailData = detailDataStore(null)
const hasDetailData = derived(detailData, $detailData => !!$detailData)

function detailDataStore(initialData) {
  const { subscribe, set } = writable(initialData)

  return {
    subscribe,
    async update(itemData) {
      detailFetchProcessing.set(true)
      const axiosConfig = {
        params: {
          url: encodeURI(itemData.url),
          // url: "simple",
        },
      }
      try {
        const response = await axios.get(process.env.DETAIL_API, axiosConfig)
        const data = {
          ...addCommentTexts(response.data),
          itemData: itemData,
        }
        const entries = deepFreeze(data)
        set(entries)
        detailFetchErrorMessage.set("")
      } catch (e) {
        detailFetchErrorMessage.set(e.message)
        console.error(e)
      }
      detailFetchProcessing.set(false)
    },
    reset() {
      set(null)
      detailFetchErrorMessage.set("")
    },
  }
}

function addCommentTexts(detail) {
  detail.data.entries = detail.data.entries.map((obj, floorIndex) => {
    if (!obj.content) {
      return obj
    }
    obj.content.bookmarks = obj.content.bookmarks
      .map((bookmark, index, bookmarks) => {
        const comment = bookmark.comment
        if (!comment) {
          bookmark.commentTexts = ""
          return bookmark
        }
        const commentTexts = splitComment(comment)
        const idCalls = commentTexts.reduce((result, text) => {
          if (text.type === "idCall") {
            const targetIndex = bookmarks.findIndex(bm => bm.user === text.user)
            if (targetIndex > -1) {
              const target = bookmarks[targetIndex]
              if (!target.idCalled) {
                target.idCalled = []
              }
              target.idCalled = [...target.idCalled, bookmark.user]
            }
            result.push(text.user)
          }
          return result
        }, [])
        bookmark.commentTexts = commentTexts
        if (idCalls.length) {
          bookmark.idCalls = idCalls
        }
        return bookmark
      })
      .map((bookmark, index, bookmarks) => {
        if (bookmark.idCalls) {
          const idCalls = uniq(bookmark.idCalls)
          bookmark.idCalls = idCalls.map(id => {
            const data = bookmarks.find(bm => bm.user === id)
            const belowData =
              floorIndex > 0
                ? detail.data.entries[floorIndex - 1].content.bookmarks.find(bm => bm.user === id)
                : undefined
            const belowEid = belowData ? detail.data.entries[floorIndex - 1].content.eid : undefined
            if (!data) {
              return {
                user: id,
                hasBookmark: false,
                belowData,
                belowEid,
              }
            }
            data.belowData = belowData
            data.belowEid = belowEid
            return data
          })
        }
        if (bookmark.idCalled) {
          const idCalled = uniq(bookmark.idCalled)
          bookmark.idCalled = idCalled.map(id => {
            return bookmarks.find(bm => bm.user === id)
          })
        }
        return bookmark
      })
    return obj
  })
  return detail
}

export { detailFetchProcessing, detailFetchErrorMessage, detailData, hasDetailData }
