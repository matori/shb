import webUrlRegexp from "~/libs/regex-weburl"

const entryEid = "(?:b:)?id:entry:[0-9]+"
const entryEidForReplace = "(?:b:)?id:entry:([0-9]+)"
const idCall = "(?:b:)?id:(?!entry:)[a-zA-Z][\\w\\-]{1,30}[a-zA-Z0-9]"
const idCallForReplace = "(?:b:)?id:(?!entry:)([a-zA-Z][\\w\\-]{1,30}[a-zA-Z0-9])"

function splitComment(comment) {
  // コメントをURL,エントリーID、IDコールで分割する
  // 分割にマッチした正規表現部分も含むように
  const separatedComment = comment.split(new RegExp(`(${webUrlRegexp}|${entryEid}|${idCall})`, "ig"))

  return separatedComment.map(text => {
    const result = {
      text,
    }
    const loweredText = text.toLowerCase()
    if (isUrl(loweredText)) {
      result.type = "url"
    } else if (isEntryEid(loweredText)) {
      result.type = "entryEid"
      result.eid = text.replace(new RegExp(entryEidForReplace, "i"), "$1")
    } else if (isIdCall(loweredText)) {
      result.type = "idCall"
      result.user = text.replace(new RegExp(idCallForReplace, "i"), "$1")
    } else {
      result.type = "text"
    }
    return result
  })
}

function isUrl(text) {
  return new RegExp(`^${webUrlRegexp}$`).test(text)
}

function isEntryEid(text) {
  return new RegExp(`^${entryEid}$`).test(text)
}

function isIdCall(text) {
  return new RegExp(`^${idCall}$`).test(text)
}

export default splitComment
