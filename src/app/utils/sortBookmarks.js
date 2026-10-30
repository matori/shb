// コメント一覧の並び順。value は表示状態として保存する値
const BOOKMARK_ORDERS = [
  { value: "newest", label: "新しい順" },
  { value: "oldest", label: "古い順" },
  { value: "stars", label: "スターの多い順" },
]

// ブックマークを並べ替えた新しい配列を返す
// - bookmarks: detail API の順（新しい順）
// - starsOf: ブックマークのスター（{ total, colors }、なければ null）を返す関数
// スターの多い順で同じ数のときは、新しい順にする（toSorted は安定ソートなので、元の順が残る）
function sortBookmarks(bookmarks, order, starsOf) {
  if (order === "oldest") {
    return bookmarks.toReversed()
  }
  if (order === "stars") {
    return bookmarks.toSorted((a, b) => (starsOf(b)?.total ?? 0) - (starsOf(a)?.total ?? 0))
  }
  return [...bookmarks]
}

export { BOOKMARK_ORDERS, sortBookmarks }
