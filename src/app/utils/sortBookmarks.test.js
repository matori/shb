import { describe, expect, test } from "vitest"
import { sortBookmarks } from "~/utils/sortBookmarks"

// detail API と同じく、新しい順に並んだブックマーク
const bookmarks = [{ user: "newest" }, { user: "middle" }, { user: "oldest" }, { user: "noStars" }]
const stars = { newest: { total: 1 }, middle: { total: 5 }, oldest: { total: 1 } }
const starsOf = (bookmark) => stars[bookmark.user] ?? null
const users = (sorted) => sorted.map((bookmark) => bookmark.user)

describe("sortBookmarks", () => {
  test("新しい順は、元の順のまま新しい配列を返す", () => {
    const sorted = sortBookmarks(bookmarks, "newest", starsOf)
    expect(users(sorted)).toEqual(["newest", "middle", "oldest", "noStars"])
    expect(sorted).not.toBe(bookmarks)
  })

  test("古い順は、逆の順にする", () => {
    expect(users(sortBookmarks(bookmarks, "oldest", starsOf))).toEqual(["noStars", "oldest", "middle", "newest"])
  })

  test("スターの多い順は、合計の多い順にし、同じ数なら新しい順にする。スターのないものは最後", () => {
    expect(users(sortBookmarks(bookmarks, "stars", starsOf))).toEqual(["middle", "newest", "oldest", "noStars"])
  })

  test("スターがまだないときのスターの多い順は、新しい順のまま", () => {
    expect(users(sortBookmarks(bookmarks, "stars", () => null))).toEqual(["newest", "middle", "oldest", "noStars"])
  })

  test("元の配列は変えない", () => {
    sortBookmarks(bookmarks, "oldest", starsOf)
    sortBookmarks(bookmarks, "stars", starsOf)
    expect(users(bookmarks)).toEqual(["newest", "middle", "oldest", "noStars"])
  })
})
