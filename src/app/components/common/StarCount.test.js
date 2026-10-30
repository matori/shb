// @vitest-environment jsdom
import { render } from "@testing-library/svelte"
import { expect, test } from "vitest"
import StarCount from "~/components/common/StarCount.svelte"

test("スターがなければ何も表示しない", () => {
  const { container } = render(StarCount, { stars: null })
  expect(container.textContent.trim()).toBe("")
})

test("色ごとのアイコンと数を並べ、読み上げには色の名前と数を文字で伝える", () => {
  const { container } = render(StarCount, { stars: { total: 8, colors: { yellow: 7, blue: 1 } } })
  const starCount = container.querySelector(".StarCount")
  expect(starCount.getAttribute("title")).toBe("スター 8個（黄色 7、青 1）")
  expect(starCount.querySelector(".VisuallyHidden").textContent).toBe("スター 8個（黄色 7、青 1）")

  const colors = [...starCount.querySelectorAll(".StarCount-color")]
  expect(
    colors.map((color) => [color.classList.contains("_yellow") ? "yellow" : "blue", color.textContent.trim()]),
  ).toEqual([
    ["yellow", "7"],
    ["blue", "1"],
  ])
  // 見た目のアイコンと数は、読み上げに重ねて読まれないようにする
  expect(colors.every((color) => color.getAttribute("aria-hidden") === "true")).toBe(true)
})
