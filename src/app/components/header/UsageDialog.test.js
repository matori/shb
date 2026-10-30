// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/svelte"
import { expect, test, vi } from "vitest"
import UsageDialog from "~/components/header/UsageDialog.svelte"

// 閉じたダイアログの中身は読み上げの対象から外れるので、hidden も含めて探す
const options = { hidden: true }

test("画面の見方・マウス・キーボード・設定の見出しで、操作を説明する", () => {
  render(UsageDialog, { open: false })
  const headings = screen.getAllByRole("heading", { level: 3, ...options }).map((heading) => heading.textContent)
  expect(headings).toEqual(["画面の見方", "マウスでの操作", "キーボードでの操作", "設定でできること"])
})

test("「設定を開く」を押すと、onopensettings を呼ぶ", async () => {
  const onopensettings = vi.fn()
  render(UsageDialog, { open: false, onopensettings })
  await fireEvent.click(screen.getByRole("button", { name: "設定を開く", ...options }))
  expect(onopensettings).toHaveBeenCalledOnce()
})
