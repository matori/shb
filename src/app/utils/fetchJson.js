// APIからJSONを取得する。HTTPステータスがエラーのときは例外にする
async function fetchJson(url, params = {}) {
  const requestUrl = new URL(url, location.href)
  for (const [key, value] of Object.entries(params)) {
    requestUrl.searchParams.set(key, value)
  }
  const response = await fetch(requestUrl)
  if (!response.ok) {
    // APIのエラーレスポンス（error.schema.json）なら、そのメッセージを使う
    const body = await response.json().catch(() => null)
    throw new Error(body?.message ?? `Request failed with status code ${response.status}`)
  }
  return response.json()
}

export default fetchJson
