function apiIndex() {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>ダミーAPI</title>
</head>
<body>
  <h1>ダミーAPI（開発用）</h1>
  <p>本番APIの仕様は <code>docs/frontend-api.md</code> と <code>schema/*.schema.json</code> を参照</p>
  <ul>
    <li>フィードをまとめたJSON: <a href="/api/entries">/api/entries</a>
      <ul>
        <li><code>data/entries.json</code> を返す。総合の人気の先頭に、下のダミーの詳細を開くためのエントリーがある</li>
        <li><code>?servererror</code> で500エラー</li>
      </ul>
    </li>
    <li>エントリー詳細: <a href="/api/detail">/api/detail</a>
      <ul>
        <li><code>?url={名前}</code> か <code>?url=https://example.com/dummy/{名前}</code> で、次のダミーを返す
          <ul>
            <li><code>data/details/</code> にあるJSONファイル名（拡張子なし）: そのファイルの内容</li>
            <li><code>slow</code> / <code>veryslow</code>: 5秒 / 90秒待ってから、自動生成したデータ</li>
            <li><code>servererror</code>: 500エラー</li>
          </ul>
        </li>
        <li><code>url</code> がない・空: 400エラー。http(s)でない・2048文字を超える: 400エラー</li>
        <li>それ以外は自動生成したデータ（まれに、1件目の取得失敗・ブックマークなし・途中の階の取得失敗になる）</li>
      </ul>
    </li>
  </ul>
  <p>ダミーデータがスキーマに沿っているかは <code>npm run validate:mock</code> で確認できる</p>
</body>
</html>
`
}

export default apiIndex
