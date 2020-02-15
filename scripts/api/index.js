const fs = require("fs")
const path = require("path")

function apiIndex(req, res) {
  const examplesLength = fs.readdirSync(path.resolve(__dirname, "./data/details/")).length
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>ダミーAPI</title>
</head>
<body>
  <h1>APIのサンプル（開発用）</h1>
  <ul>
    <li>フィードをまとめたJSONのサンプル: <a href="/api/entries">/api/entries</a></li>
    <li>エントリー詳細のサンプル: <a href="/api/detail">/api/detail</a>
      <ul>
        <li><code>?url={拡張子なしのJSONファイル名}</code>で指定ファイルのデータを返す</li>
        <li>そうでなければ自動生成したデータを返す</li>
      </ul>
  </ul>
  <p>実際のAPIはPHPで実装しているので、詳細は <code>{PROJECT_ROOT}/api</code> を参照</p>
  <p>なお、ダミーAPI周りは <code>{PROJECT_ROOT}/scripts</code> あたりを参照</p>
</body>
</html>
`
}

module.exports = apiIndex
