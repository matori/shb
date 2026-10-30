// ブックマークコメントを、リンクにする記法とそれ以外の文字に分ける
// 対応する記法（https://b.hatena.ne.jp/help/entry/textformat 、 https://anond.hatelabo.jp/help）
// - URL（http・https）
// - b:id:ユーザー名、id:ユーザー名（IDコール）
// - @ユーザー名（Twitter ユーザー記法。X のユーザーページにリンクする）
// - anond:記事番号（匿名ダイアリーの記事）
// - b:id:entry:エントリーID、id:entry:エントリーID（はてな公式では使えなくなったが、使っている人がいるので残す）

// はてなIDは英字で始まり、英数字・ハイフン・アンダースコアの3〜32文字で、英数字で終わる
const HATENA_ID = "[a-z][\\w-]{1,30}[a-z0-9]"
// 英数字のすぐ後ろでは記法として扱わない（メールアドレスや単語の途中を避ける）
const NOT_AFTER_WORD = "(?<![a-z0-9_])"

const NOTATIONS = new RegExp(
  [
    // URLに使える ASCII の文字だけを取り、日本語や空白、引用符などが来たら終わる。括弧と末尾の記号は trimUrl で調整する
    "(?<url>https?:\\/\\/[a-z0-9\\-._~:/?#\\[\\]@!$&'()*+,;=%]+)",
    `${NOT_AFTER_WORD}(?:b:)?id:entry:(?<eid>\\d+)`,
    `${NOT_AFTER_WORD}(?:b:)?id:(?<hatenaId>${HATENA_ID})(?![\\w-])`,
    `${NOT_AFTER_WORD}@(?<twitterId>\\w{1,15})(?!\\w)`,
    `${NOT_AFTER_WORD}anond:(?<anondId>\\d{14})(?!\\d)`,
  ].join("|"),
  "gi",
)

// 戻り値は { type, text, url } の配列。type は text・url・entry・idCall・twitter・anond
// idCall には、IDコールの関係を作るためにユーザー名（user）もつける
function parseComment(comment) {
  const parts = []
  let textStart = 0

  for (const match of comment.matchAll(NOTATIONS)) {
    const part = toPart(match)
    if (!part) {
      continue
    }
    if (match.index > textStart) {
      parts.push({ type: "text", text: comment.slice(textStart, match.index) })
    }
    parts.push(part)
    textStart = match.index + part.text.length
    // URL を短くした場合、切り落とした部分にも記法があるかもしれないので、そこから探し直す
    if (part.text.length < match[0].length) {
      return [...parts, ...parseComment(comment.slice(textStart))]
    }
  }

  if (textStart < comment.length) {
    parts.push({ type: "text", text: comment.slice(textStart) })
  }
  return parts
}

function toPart(match) {
  const { url, eid, hatenaId, twitterId, anondId } = match.groups
  if (url) {
    const text = trimUrl(url)
    return URL.parse(text)?.hostname ? { type: "url", text, url: text } : null
  }
  if (eid) {
    return { type: "entry", text: match[0], url: `https://b.hatena.ne.jp/entry/${eid}` }
  }
  if (hatenaId) {
    return { type: "idCall", text: match[0], url: `https://b.hatena.ne.jp/${hatenaId}/`, user: hatenaId }
  }
  if (twitterId) {
    return { type: "twitter", text: match[0], url: `https://x.com/${twitterId}` }
  }
  return { type: "anond", text: match[0], url: `https://anond.hatelabo.jp/${anondId}` }
}

// URL の終わりを決める
// - 対になっていない閉じ括弧で終わる。「(URL)(URL)」は別々のURLにし、「…/page(v=1)」は括弧まで含める
// - 末尾の句読点などは、文の区切りとみなして含めない
function trimUrl(url) {
  let depth = 0
  let end = url.length
  for (let i = 0; i < url.length; i++) {
    if (url[i] === "(") {
      depth++
    } else if (url[i] === ")") {
      if (depth === 0) {
        end = i
        break
      }
      depth--
    }
  }
  return url.slice(0, end).replace(/[.,!?:;']+$/, "")
}

export default parseComment
