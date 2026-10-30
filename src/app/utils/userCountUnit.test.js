import { expect, test } from "vitest"
import userCountUnit from "~/utils/userCountUnit"

test("1なら user、それ以外は users にする", () => {
  expect(userCountUnit(1)).toBe("user")
  expect(userCountUnit(0)).toBe("users")
  expect(userCountUnit(2)).toBe("users")
  expect(userCountUnit(481)).toBe("users")
})
