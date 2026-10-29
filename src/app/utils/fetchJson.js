// はてな側のタイムアウトが30秒なので、余裕を持たせる
const TIMEOUT = 60 * 1000

// APIからJSONを取得する。HTTPステータスがエラーのときと、タイムアウトしたときは例外にする
// signal を渡すと、呼び出し側からリクエストを中断できる（中断したときは AbortError になる）
async function fetchJson(url, params = {}, { signal } = {}) {
  const requestUrl = new URL(url, location.href)
  for (const [key, value] of Object.entries(params)) {
    requestUrl.searchParams.set(key, value)
  }
  const timeoutSignal = AbortSignal.timeout(TIMEOUT)
  try {
    const response = await fetch(requestUrl, {
      signal: signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal,
    })
    if (!response.ok) {
      // APIのエラーレスポンス（error.schema.json）なら、そのメッセージを使う
      const body = await response.json().catch(() => null)
      throw new Error(body?.message ?? `Request failed with status code ${response.status}`)
    }
    return await response.json()
  } catch (e) {
    if (e.name === "TimeoutError") {
      throw new Error(`APIから${TIMEOUT / 1000}秒以内に応答がありませんでした`, { cause: e })
    }
    throw e
  }
}

export default fetchJson
