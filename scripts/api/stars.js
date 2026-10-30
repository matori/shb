import detail from "./detail.js"

// 詳細のあとから届く様子が分かるように、スターは少し遅らせて返す（ミリ秒）
const STARS_DELAY = 800

// 通常の黄色のスター以外の色
const COLORED_STAR_COLORS = ["green", "red", "blue", "purple"]

// 本番APIの /stars と同じように、ステータスコードと本文を返す
// 同じ url の /detail のダミーをもとに、ユーザー名などから毎回同じスターを作る
// （/detail の自動生成のデータは呼ぶたびに変わるので、そのときのスターは詳細のブックマークとは合わない）
function stars(searchParams) {
  const response = detail(searchParams)
  if (response.status !== 200) {
    return response
  }
  const { last_modified, expires, data } = response.body
  const url = searchParams.get("url")

  // 本番APIと同じく、取得に失敗した階は含めない
  const entries = data.entries
    .filter((entry) => !entry.error)
    .map(({ content }) => {
      if (!content) {
        return { eid: null, entry: { uri: url, stars: null }, bookmarks: {} }
      }
      return {
        eid: content.eid,
        entry: { uri: content.url, stars: createStarCount(`entry:${content.eid}`, { emptyRate: 2 }) },
        bookmarks: Object.fromEntries(
          content.bookmarks
            .map((bookmark) => [bookmark.user, createStarCount(`${content.eid}:${bookmark.user}`)])
            .filter(([, starCount]) => starCount),
        ),
      }
    })

  return {
    status: 200,
    body: { last_modified, expires, data: { floor: data.floor, entries, error: data.error } },
    delay: (response.delay ?? 0) + STARS_DELAY,
  }
}

// 文字列から毎回同じスターの数を作る。スターがないときは null
// - emptyRate: この数のうち1回くらいの割合でスターをつける
function createStarCount(seed, { emptyRate = 3 } = {}) {
  const number = hash(seed)
  if (number % emptyRate !== 0) {
    return null
  }
  const colors = {}
  // ときどき100を超えるスターをつけて、スターの多い順の並び替えを確かめやすくする
  colors.yellow = number % 7 === 0 ? 100 + (number % 50) : (number % 9) + 1
  if (number % 5 === 0) {
    colors[COLORED_STAR_COLORS[number % COLORED_STAR_COLORS.length]] = (number % 3) + 1
  }
  const total = Object.values(colors).reduce((sum, count) => sum + count, 0)
  return { total, colors }
}

function hash(text) {
  let number = 0
  for (const character of text) {
    number = (number * 31 + character.codePointAt(0)) >>> 0
  }
  return Math.floor(number / 7)
}

export default stars
