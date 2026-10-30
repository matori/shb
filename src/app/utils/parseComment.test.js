import { describe, expect, test } from "vitest"
import parseComment from "~/utils/parseComment"

// リンクになった部分だけを「種類:文字」の形で取り出す
function links(comment) {
  return parseComment(comment)
    .filter((part) => part.url)
    .map((part) => `${part.type}:${part.text}`)
}

describe("parseComment", () => {
  test("記法のない部分も含めて、元のコメントを順番どおりに分ける", () => {
    const comment = "前id:foo中https://example.com/a後"
    const parts = parseComment(comment)
    expect(parts.map((part) => part.text).join("")).toBe(comment)
    expect(parts.map((part) => part.type)).toEqual(["text", "idCall", "text", "url", "text"])
  })

  describe("URL", () => {
    test("http と https をリンクにする", () => {
      expect(links("http://example.com と https://example.com/a?b=1#c")).toEqual([
        "url:http://example.com",
        "url:https://example.com/a?b=1#c",
      ])
    })

    test("日本語が来たら URL を終える", () => {
      expect(links("https://example.com/pathです")).toEqual(["url:https://example.com/path"])
      expect(links("ぬくみhttp://example.COM巣")).toEqual(["url:http://example.COM"])
    })

    test("「(URL)(URL)」は別々のリンクにする", () => {
      expect(links("(https://example.com/a)(https://example.com/b)")).toEqual([
        "url:https://example.com/a",
        "url:https://example.com/b",
      ])
    })

    test("URL の中で対になっている括弧は含める", () => {
      expect(links("https://example.com/page(v=1)を参照")).toEqual(["url:https://example.com/page(v=1)"])
    })

    test("末尾の句読点などは含めない", () => {
      expect(links("https://example.com/end. https://example.com/a?b=1, ok!")).toEqual([
        "url:https://example.com/end",
        "url:https://example.com/a?b=1",
      ])
    })

    test("http・https 以外と、ホストのないものはリンクにしない", () => {
      expect(links("//example.com ftp://example.com https:// example.com")).toEqual([])
    })

    test("URL の中の記法は URL の一部として扱う", () => {
      expect(links("https://example.com/id:foo")).toEqual(["url:https://example.com/id:foo"])
    })
  })

  describe("IDコール", () => {
    test("id: と b:id: をユーザーページにリンクし、ユーザー名を持たせる", () => {
      const parts = parseComment("id:foo と b:id:bar-baz と ID:user1782")
      const idCalls = parts.filter((part) => part.type === "idCall")
      expect(idCalls.map((part) => [part.text, part.user, part.url])).toEqual([
        ["id:foo", "foo", "https://b.hatena.ne.jp/foo/"],
        ["b:id:bar-baz", "bar-baz", "https://b.hatena.ne.jp/bar-baz/"],
        ["ID:user1782", "user1782", "https://b.hatena.ne.jp/user1782/"],
      ])
    })

    test("日本語が続いても、はてなIDの部分だけをリンクにする", () => {
      expect(links("id:fooさんへ")).toEqual(["idCall:id:foo"])
    })

    test("英数字のすぐ後ろの id: は記法として扱わない", () => {
      expect(links("xid:foo")).toEqual([])
    })
  })

  test("id:entry: と b:id:entry: をエントリーページにリンクする", () => {
    const parts = parseComment("id:entry:12345 と b:id:entry:6").filter((part) => part.url)
    expect(parts.map((part) => [part.type, part.url])).toEqual([
      ["entry", "https://b.hatena.ne.jp/entry/12345"],
      ["entry", "https://b.hatena.ne.jp/entry/6"],
    ])
  })

  describe("@ユーザー名", () => {
    test("X のユーザーページにリンクする", () => {
      const parts = parseComment("@jack こんにちは").filter((part) => part.url)
      expect(parts.map((part) => [part.text, part.url])).toEqual([["@jack", "https://x.com/jack"]])
    })

    test("日本語が続いても、ユーザー名の部分だけをリンクにする", () => {
      expect(links("@user_name1さん")).toEqual(["twitter:@user_name1"])
    })

    test("メールアドレスと、16文字以上のものはリンクにしない", () => {
      expect(links("foo@example.com @toolongusername_123")).toEqual([])
    })
  })

  describe("anond:", () => {
    test("匿名ダイアリーの記事にリンクする", () => {
      const parts = parseComment("anond:20060923210701").filter((part) => part.url)
      expect(parts.map((part) => [part.text, part.url])).toEqual([
        ["anond:20060923210701", "https://anond.hatelabo.jp/20060923210701"],
      ])
    })

    test(":title などの後ろの部分は、文字のまま残す", () => {
      const parts = parseComment("anond:20060923210701:title=ああ")
      expect(parts.map((part) => [part.type, part.text])).toEqual([
        ["anond", "anond:20060923210701"],
        ["text", ":title=ああ"],
      ])
    })

    test("英数字のすぐ後ろと、記事番号の桁が違うものはリンクにしない", () => {
      expect(links("xanond:20060923210701 anond:2006092321070")).toEqual([])
    })
  })
})
