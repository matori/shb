const faker = require("faker")
const dayjs = require("dayjs")
const utc = require("dayjs/plugin/utc")
const getRandomIntInclusive = require("../utils/getRandomIntInclusive")
const loremIpsum = require("lorem-ipsum-japanese")

faker.locale = "ja"

require("dayjs/locale/ja")
dayjs.locale("ja")
dayjs.extend(utc)

function createDummyDetail() {
  const result = {
    last_modified: dummyDate(),
    expires: dummyDate(),
    data: {
      floor: 1,
      entries: []
    },
  }

  if (rare()) {
    result.data.entries[0] = {
      error: true,
      status_code: 404,
      message:
        "Client error: `GET https://b.hatena.ne.jp/p/entry/jsonlite/http://exapmle.com/` resulted in a `404 Not Found` response",
      content: null,
    }
    return result
  }

  const floorsCount = getRandomIntInclusive(1, 10)

  for (const i of createArray(floorsCount)) {
    const data = {
      error: false,
      status_code: 200,
    }

    if (rare()) {
      data.content = null
    } else {
      data.content = {
        bookmarks: bookmarks(),
        // url: 'http://localhost/',
        // count: number,
        eid: faker.random.number().toString(),
        screenshot:
          "https://b.st-hatena.com/images/v4/public/common/noimage.png?version=95fdba88c17683f2972c05f7aad7f414f2ad2e61",
        // requested_url: 'http://localhost/',
        title: title(),
        // entry_url: 'https://b.hatena.ne.jp/entry/localhost/',
      }
      const url = faker.internet.url()
      data.content.url = url
      data.content.requested_url = url
      data.content.entry_url = `https://b.hatena.ne.jp/entry/${url}`
      data.content.count = data.content.bookmarks.length + getRandomIntInclusive(0, 100)
    }

    if (!data.content) {
      if (i === 0) {
        result.data.entries.push(data)
      }
      break
    }

    result.data.entries.push(data)
  }

  return result
}

function dummyDate(format) {
  return dayjs(faker.date.recent()).format(format)
}

function bookmarks() {
  const user = getUser()

  return createArray(getRandomIntInclusive(3, 100)).map(() => {
    return {
      timestamp: dayjs(faker.date.recent()).format("YYYY/MM/DD HH:mm"),
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
  if (!!bool) {
    return faker.lorem.word()
  }
  const ja = loremIpsum({ suffix: "" })
  return ja.length > 9 ? ja.substring(0, getRandomIntInclusive(1, 10)) : ja
}

function title() {
  const bool = getRandomIntInclusive(0, 1)
  let title
  if (!!bool) {
    title = faker.lorem.text()
  } else {
    title = loremIpsum({ count: 2, suffix: "" })
  }
  return title.length > 200 ? title.substring(0, getRandomIntInclusive(1, 199)) : title
}

function rare() {
  return Math.random() >= 0.9
}

module.exports = createDummyDetail
