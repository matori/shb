import { fakerJA as faker } from "@faker-js/faker"
import loremIpsum from "lorem-ipsum-japanese"
import getRandomIntInclusive from "../utils/getRandomIntInclusive.js"
import { nowInJapan, dateToJapanTime, toApiDateTime, toBookmarkTimestamp } from "../utils/japanTime.js"

// 本番APIの detail.schema.json に沿ったダミーデータを作る
function createDummyDetail() {
  const now = nowInJapan()
  const result = {
    last_modified: toApiDateTime(now),
    expires: toApiDateTime(now.add({ minutes: 5 })),
    data: {
      floor: 1,
      entries: [],
      error: false,
    },
  }

  // 1件目の取得に失敗した場合
  if (rare()) {
    result.data.entries.push({
      error: true,
      status_code: 503,
      message: "HTTP 503",
      content: null,
    })
    result.data.error = true
    return result
  }

  // ブックマークされていないURLの場合（エラーではない）
  if (rare()) {
    result.data.entries.push({
      error: false,
      status_code: 200,
      content: null,
    })
    return result
  }

  // 2階以降は、1つ下の階のエントリーページ（entry_url）のエントリー
  let url = faker.internet.url()
  for (const i of createArray(getRandomIntInclusive(1, 10))) {
    // 途中の階で取得に失敗した場合は、そこまでの階を返す
    if (i > 0 && rare(0.03)) {
      result.data.error = true
      break
    }
    const content = entryContent(url)
    result.data.entries.push({
      error: false,
      status_code: 200,
      content,
    })
    url = content.entry_url
  }

  return result
}

function entryContent(url) {
  const content = {
    eid: faker.number.int({ max: 9999999 }).toString(),
    title: title(),
    url,
    entry_url: `https://b.hatena.ne.jp/entry/${url.replace(/^https:\/\//, "s/").replace(/^http:\/\//, "")}`,
    requested_url: url,
    screenshot: "https://b.st-hatena.com/images/v4/public/common/noimage.png",
    bookmarks: bookmarks(),
    related: createArray(getRandomIntInclusive(0, 5)).map(relatedEntry),
  }
  content.count = content.bookmarks.length + getRandomIntInclusive(0, 100)
  return content
}

function relatedEntry() {
  const url = faker.internet.url()
  return {
    eid: faker.number.int({ max: 9999999 }).toString(),
    title: title(),
    count: getRandomIntInclusive(1, 500),
    url,
    entry_url: `https://b.hatena.ne.jp/entry/${url.replace(/^https?:\/\//, "")}`,
  }
}

function bookmarks() {
  const user = getUser()

  return createArray(getRandomIntInclusive(3, 100)).map(() => {
    return {
      timestamp: toBookmarkTimestamp(dateToJapanTime(faker.date.recent())),
      comment: getRandomIntInclusive(0, 1)
        ? loremIpsum({
            suffix: "",
          })
        : "",
      tags: getRandomIntInclusive(0, 1) ? createArray(getRandomIntInclusive(1, 5)).map(() => tag()) : [],
      user: user(),
    }
  })
}

function getUser() {
  let uid = 0

  return function unique() {
    uid += 1
    const number = Math.floor(Math.random() * 1000)
    return `user${number}${uid}`
  }
}

function createArray(length) {
  return Array.from(Array(length)).map((value, index) => index)
}

function tag() {
  const bool = getRandomIntInclusive(0, 1)
  if (bool) {
    return faker.lorem.word()
  }
  const ja = loremIpsum({ suffix: "" })
  return ja.length > 9 ? ja.substring(0, getRandomIntInclusive(1, 10)) : ja
}

function title() {
  const bool = getRandomIntInclusive(0, 1)
  let title
  if (bool) {
    title = faker.lorem.text()
  } else {
    title = loremIpsum({ count: 2, suffix: "" })
  }
  return title.length > 200 ? title.substring(0, getRandomIntInclusive(1, 199)) : title
}

function rare(probability = 0.1) {
  return Math.random() < probability
}

export default createDummyDetail
