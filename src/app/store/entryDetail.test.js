import { readFileSync } from "node:fs"
import { describe, expect, test } from "vitest"
import { addCommentDetails } from "~/store/entryDetail.svelte.js"

// ダミーAPIの、階をまたいだIDコールのデータ
// 1階: alice, bob（id:alice）, carol, dave（b:id:bob）
// 2階: erin（id:dave）, dave（id:erin, id:frank）, alice（ID:erin）, grace
function loadIdCallResponse() {
  const path = new URL("../../../scripts/api/data/details/idcall.json", import.meta.url)
  return addCommentDetails(JSON.parse(readFileSync(path, "utf-8")))
}

function bookmarksOf(response, floorIndex) {
  return Object.fromEntries(
    response.data.entries[floorIndex].content.bookmarks.map((bookmark) => [bookmark.user, bookmark]),
  )
}

describe("addCommentDetails", () => {
  test("コメントを記法ごとに分ける。コメントがなければ空の配列にする", () => {
    const floor1 = bookmarksOf(loadIdCallResponse(), 0)
    expect(floor1.bob.commentParts.map((part) => part.type)).toEqual(["idCall", "text"])
    expect(floor1.carol.commentParts).toEqual([])
  })

  test("同じ階でIDコールした相手と、IDコールされた相手を結びつける", () => {
    const floor1 = bookmarksOf(loadIdCallResponse(), 0)
    expect(floor1.bob.idCallsTo).toEqual([
      { user: "alice", bookmark: floor1.alice, lowerFloorBookmark: null, lowerFloorEid: undefined },
    ])
    expect(floor1.alice.idCalledBy).toEqual([floor1.bob])
    expect(floor1.bob.idCalledBy).toEqual([floor1.dave])
    expect(floor1.carol.idCallsTo).toBeUndefined()
    expect(floor1.carol.idCalledBy).toBeUndefined()
  })

  test("IDコールした相手が下の階にもブックマークしていれば、そのブックマークも結びつける", () => {
    const response = loadIdCallResponse()
    const floor1 = bookmarksOf(response, 0)
    const floor2 = bookmarksOf(response, 1)
    expect(floor2.erin.idCallsTo).toEqual([
      {
        user: "dave",
        bookmark: floor2.dave,
        lowerFloorBookmark: floor1.dave,
        lowerFloorEid: response.data.entries[0].content.eid,
      },
    ])
  })

  test("まだブックマークしていない相手へのIDコールは、bookmark を null にする", () => {
    const floor2 = bookmarksOf(loadIdCallResponse(), 1)
    expect(floor2.dave.idCallsTo.map((idCall) => [idCall.user, idCall.bookmark])).toEqual([
      ["erin", floor2.erin],
      ["frank", null],
    ])
  })

  test("大文字の ID: でもIDコールとして扱い、IDコールした順に並べる", () => {
    const floor2 = bookmarksOf(loadIdCallResponse(), 1)
    expect(floor2.erin.idCalledBy).toEqual([floor2.dave, floor2.alice])
  })
})
