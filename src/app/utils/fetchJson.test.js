import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import fetchJson from "~/utils/fetchJson"

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } })
}

// 相対URLの基準にする、ページのURL
beforeEach(() => {
  vi.stubGlobal("location", { href: "https://shb.unformedbuilding.com/" })
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe("fetchJson", () => {
  test("パラメーターをクエリにつけて取得し、JSON を返す", async () => {
    const fetch = vi.fn(async () => jsonResponse({ ok: true }))
    vi.stubGlobal("fetch", fetch)
    await expect(fetchJson("https://api.example.com/detail", { url: "https://example.com/?a=1" })).resolves.toEqual({
      ok: true,
    })
    const requestUrl = fetch.mock.calls[0][0]
    expect(requestUrl.searchParams.get("url")).toBe("https://example.com/?a=1")
  })

  test("エラーのステータスで、APIのエラーメッセージがあればそれを使う", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => jsonResponse({ error: true, message: "urlパラメータが不正です" }, 400)),
    )
    await expect(fetchJson("https://api.example.com/detail")).rejects.toThrow("urlパラメータが不正です")
  })

  test("エラーのステータスで、本文が JSON でなければステータスコードを伝える", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("<html>", { status: 404 })),
    )
    await expect(fetchJson("https://api.example.com/detail")).rejects.toThrow("status code 404")
  })

  test("タイムアウトしたら、日本語のメッセージにする", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new DOMException("timeout", "TimeoutError")
      }),
    )
    await expect(fetchJson("https://api.example.com/entries")).rejects.toThrow("秒以内に応答がありませんでした")
  })
})
