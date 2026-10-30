import { describe, expect, test } from "vitest"
import formatDateTime from "~/utils/formatDateTime"

// テストのタイムゾーンは vite.config.js で Asia/Tokyo にしている
describe("formatDateTime", () => {
  test("「年/月/日 時:分:秒」の形にし、1桁の数は0で埋める", () => {
    expect(formatDateTime(new Date("2026-01-02T03:04:05+09:00"))).toBe("2026/01/02 03:04:05")
  })

  test("0時を24時ではなく00時にする", () => {
    expect(formatDateTime(new Date("2026-10-30T00:25:44+09:00"))).toBe("2026/10/30 00:25:44")
  })

  test("showSeconds が false なら秒を出さない", () => {
    expect(formatDateTime(new Date("2026-10-29T10:00:30+09:00"), { showSeconds: false })).toBe("2026/10/29 10:00")
  })

  test("閲覧している環境のタイムゾーンに直す", () => {
    expect(formatDateTime(new Date("2026-10-29T15:30:00Z"))).toBe("2026/10/30 00:30:00")
  })
})
