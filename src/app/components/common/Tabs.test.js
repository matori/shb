// @vitest-environment jsdom
import { createRawSnippet } from "svelte"
import { fireEvent, render, screen } from "@testing-library/svelte"
import { describe, expect, test, vi } from "vitest"
import Tabs from "~/components/common/Tabs.svelte"

const tabs = [
  { key: "a", label: "最初" },
  { key: "b", label: "政治と経済", labelSegments: ["政治と", "経済"] },
  { key: "c", label: "最後" },
]

// パネルの中身。どのタブのパネルか分かるように、ラベルを出す
const children = createRawSnippet((tab) => ({ render: () => `<p>${tab().label}の中身</p>` }))

// 選択中のタブは使う側の状態で持つので、onselect で受け取った index を selected に戻す
function renderTabs(selected = 0) {
  const onselect = vi.fn()
  const result = render(Tabs, { tabs, selected, label: "カテゴリー", onselect, children })
  onselect.mockImplementation((index) => result.rerender({ selected: index }))
  return { ...result, onselect }
}

describe("Tabs", () => {
  test("タブの並びとタブ・パネルを WAI-ARIA でつなぐ", () => {
    renderTabs()
    expect(screen.getByRole("tablist", { name: "カテゴリー" })).toBeTruthy()
    const tab = screen.getByRole("tab", { name: "最初" })
    const panel = screen.getByRole("tabpanel", { name: "最初" })
    expect(tab.getAttribute("aria-controls")).toBe(panel.id)
    expect(tab.getAttribute("aria-selected")).toBe("true")
  })

  test("選ばれていないタブは Tab キーで移らず、パネルは隠す", () => {
    renderTabs()
    const tab = screen.getByRole("tab", { name: "最後" })
    expect(tab.getAttribute("tabindex")).toBe("-1")
    expect(tab.getAttribute("aria-selected")).toBe("false")
    expect(screen.getByText("最後の中身").closest("[role=tabpanel]").hidden).toBe(true)
    expect(screen.getByText("最初の中身").closest("[role=tabpanel]").hidden).toBe(false)
  })

  test("labelSegments の区切りに <wbr> を入れ、名前はラベルのままにする", () => {
    renderTabs()
    const tab = screen.getByRole("tab", { name: "政治と経済" })
    expect(tab.querySelectorAll("wbr")).toHaveLength(1)
  })

  test("クリックしたタブを選ぶ", async () => {
    const { onselect } = renderTabs()
    await fireEvent.click(screen.getByRole("tab", { name: "最後" }))
    expect(onselect).toHaveBeenCalledWith(2)
  })

  test("左右の矢印キーで前後のタブに移り、端まで行くと反対の端に戻る", async () => {
    const { onselect } = renderTabs()
    await fireEvent.keyDown(screen.getByRole("tab", { name: "最初" }), { key: "ArrowRight" })
    expect(onselect).toHaveBeenLastCalledWith(1)
    expect(document.activeElement).toBe(screen.getByRole("tab", { name: "政治と経済" }))

    await fireEvent.keyDown(document.activeElement, { key: "ArrowLeft" })
    await fireEvent.keyDown(document.activeElement, { key: "ArrowLeft" })
    expect(onselect).toHaveBeenLastCalledWith(2)
    expect(document.activeElement).toBe(screen.getByRole("tab", { name: "最後" }))
  })

  test("Home・End キーで最初・最後のタブに移る", async () => {
    const { onselect } = renderTabs(1)
    await fireEvent.keyDown(screen.getByRole("tab", { name: "政治と経済" }), { key: "End" })
    expect(onselect).toHaveBeenLastCalledWith(2)
    await fireEvent.keyDown(document.activeElement, { key: "Home" })
    expect(onselect).toHaveBeenLastCalledWith(0)
    expect(document.activeElement).toBe(screen.getByRole("tab", { name: "最初" }))
  })

  test("shortcutKey は aria-keyshortcuts で伝え、showShortcutKeys のときだけ表示する。名前はラベルのまま", async () => {
    const tabsWithKeys = tabs.map((tab, index) => ({ ...tab, shortcutKey: String(index + 1) }))
    const { rerender } = render(Tabs, { tabs: tabsWithKeys, label: "カテゴリー", children })
    const tab = screen.getByRole("tab", { name: "最初" })
    expect(tab.getAttribute("aria-keyshortcuts")).toBe("1")
    expect(tab.querySelector("kbd")).toBeNull()

    await rerender({ showShortcutKeys: true })
    expect(tab.querySelector("kbd").textContent).toBe("1")
    expect(screen.getByRole("tab", { name: "最初" })).toBe(tab)
  })

  test("修飾キーを押しているときは移らない", async () => {
    const { onselect } = renderTabs()
    await fireEvent.keyDown(screen.getByRole("tab", { name: "最初" }), { key: "ArrowRight", altKey: true })
    expect(onselect).not.toHaveBeenCalled()
  })
})
