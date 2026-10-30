// @vitest-environment jsdom
import { createRawSnippet } from "svelte"
import { fireEvent, render, screen } from "@testing-library/svelte"
import { expect, test } from "vitest"
import ToggleButton from "~/components/common/ToggleButton.svelte"

const children = createRawSnippet(() => ({ render: () => "<span>自動更新</span>" }))

test("押すたびに、switch の aria-checked を切り替える", async () => {
  render(ToggleButton, { checked: false, children })
  const toggle = screen.getByRole("switch", { name: "自動更新" })
  expect(toggle.getAttribute("aria-checked")).toBe("false")
  await fireEvent.click(toggle)
  expect(toggle.getAttribute("aria-checked")).toBe("true")
  await fireEvent.click(toggle)
  expect(toggle.getAttribute("aria-checked")).toBe("false")
})
