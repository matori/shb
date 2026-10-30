// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/svelte"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import EntryListItem from "~/components/entries/EntryListItem.svelte"

// 詳細を開くと API を取得するので、store は呼ばれたかどうかだけを見る
const { open } = vi.hoisted(() => ({ open: vi.fn() }))
vi.mock("~/store/entryDetail.svelte.js", () => ({ entryDetail: { open } }))

const entry = {
  title: "テストのエントリー",
  url: "https://example.com/article",
  bookmarkCount: 10,
  bookmarkPageUrl: "https://b.hatena.ne.jp/entry/s/example.com/article",
  siteEntriesUrl: "https://b.hatena.ne.jp/site/example.com/",
  siteEntriesLabel: "example.com",
  favicon: "",
  date: "2026-10-30T12:00:00+09:00",
}

let windowOpen

beforeEach(() => {
  open.mockClear()
  windowOpen = vi.spyOn(window, "open").mockImplementation(() => null)
})

afterEach(() => {
  windowOpen.mockRestore()
})

function countButton() {
  render(EntryListItem, { entry })
  return screen.getByRole("button", { name: /10 users/ })
}

describe("EntryListItem のブックマーク数のボタン", () => {
  test("クリックすると、エントリーの詳細を開く", async () => {
    await fireEvent.click(countButton())
    expect(open).toHaveBeenCalledWith(entry)
    expect(windowOpen).not.toHaveBeenCalled()
  })

  test("ミドルクリックすると、はてなブックマークのエントリーページを新しいタブで開く", async () => {
    await fireEvent(countButton(), new MouseEvent("auxclick", { button: 1, bubbles: true, cancelable: true }))
    expect(windowOpen).toHaveBeenCalledWith(entry.bookmarkPageUrl, "_blank", "noopener,noreferrer")
    expect(open).not.toHaveBeenCalled()
  })

  test("Ctrl・Cmd を押しながらクリックしても、はてなブックマークのエントリーページを開く", async () => {
    const button = countButton()
    await fireEvent.click(button, { ctrlKey: true })
    await fireEvent.click(button, { metaKey: true })
    expect(windowOpen).toHaveBeenCalledTimes(2)
    expect(open).not.toHaveBeenCalled()
  })

  test("右クリックなど、ミドルボタン以外の auxclick では何もしない", async () => {
    await fireEvent(countButton(), new MouseEvent("auxclick", { button: 2, bubbles: true, cancelable: true }))
    expect(windowOpen).not.toHaveBeenCalled()
  })
})
