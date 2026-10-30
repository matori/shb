import { expect, test } from "vitest"
import { describeStars } from "~/utils/describeStars"

test("黄色だけなら、合計の数だけを伝える", () => {
  expect(describeStars({ total: 3, colors: { yellow: 3 } })).toBe("スター 3個")
})

test("ほかの色もあれば、色の名前と数を、決まった色の順で伝える", () => {
  expect(describeStars({ total: 109, colors: { blue: 1, yellow: 106, red: 2 } })).toBe(
    "スター 109個（黄色 106、赤 2、青 1）",
  )
})

test("黄色がなくても、色ごとに伝える", () => {
  expect(describeStars({ total: 1, colors: { purple: 1 } })).toBe("スター 1個（紫 1）")
})
