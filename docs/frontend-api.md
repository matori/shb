# API仕様（フロントエンド向け）

はてなブックマークのデータを、フロントエンドで使いやすい形に整形して返すAPI。
レスポンスの型は、同じリポジトリの `schema/*.schema.json`（JSON Schema draft 2020-12）を正とする。この文書はスキーマに書けない振る舞いを補足する。

## 基本

- ベースURL: `https://api.unformedbuilding.com/shb/v1/`
- メソッドは `GET` のみ。認証なし
- レスポンスは `Content-Type: application/json; charset=utf-8`
- 日時はすべて ISO 8601、日本時間（`2026-10-29T12:34:56+09:00`）
- `.php` は付けても付けなくてもよい（`/shb/v1/entries` と `/shb/v1/entries.php` は同じ）

### CORS

次のOriginからのリクエストにだけ `Access-Control-Allow-Origin` を返す。これ以外のOriginのブラウザからはレスポンスを読めない。

- `unformedbuilding.com` とそのサブドメイン（http / https）
- `ub-shb.netlify.app` と、そのデプロイプレビュー（`xxx--ub-shb.netlify.app`）
- `localhost:{4桁のポート}`、`0.0.0.0:{4桁のポート}`、`192.168.1.x:{4桁のポート}`（開発用）

## エンドポイント

### `GET /shb/v1/entries`

全カテゴリの人気（`hotentry`）・新着（`entrylist`）フィードをまとめて返す。パラメータはない（`force_fetch` は後述）。

スキーマ: `entries.schema.json`

```
data.{カテゴリ}.{hotentry | entrylist}
```

- カテゴリは10種類で、常にすべて含まれる: `all`（総合） `general`（一般） `social`（世の中） `economics`（政治と経済） `life`（暮らし） `knowledge`（学び） `it`（テクノロジー） `fun`（おもしろ） `entertainment`（エンタメ） `game`（アニメとゲーム）
- フィードは1本ずつ成否が分かれる。取得できたフィードは `items`、失敗したフィードは `error: true` と `message` を持つ。**一部のフィードが失敗しても、HTTPステータスは200で、ほかのフィードは使える**
- `status` ははてな側のHTTPステータス（参考値）。通信エラーなら `0`
- エントリー（`items[]`）の補足
  - `favicon` `image` `description` は空文字のことがある
  - `realCategory` はそのエントリー自体のカテゴリ。`all` のフィードでどのカテゴリの記事かを表示するのに使える。判別できない場合は `slug` が `false`
  - `bookmarkPageUrl` ははてなブックマークのエントリーページ、`addBookmarkUrl` はブックマーク追加画面、`siteEntriesUrl` は同じサイトのエントリー一覧、`tags[].url` はタグ検索のURL。いずれもそのままリンクに使える

### `GET /shb/v1/detail?url={URL}`

指定したURLのエントリー情報（ブックマーク数、ブックマークコメント、関連エントリーなど）を返す。

スキーマ: `detail.schema.json`（200のとき）、`error.schema.json`（400のとき）

**パラメータ**

- `url`（必須）: 対象のURL。`encodeURIComponent` でエンコードして渡す
  - `http` / `https` のURLのみ、2048文字以下
  - はてなブックマークのエントリーページのURL（`https://b.hatena.ne.jp/entry/s/example.com/foo` など）を渡すと、元の記事のURLとして扱う。コメントページ（`https://b.hatena.ne.jp/entry/{eid}/comment/{user}`）も渡せる
  - `https://b.hatena.ne.jp/entry/{eid}/`（数字のIDの形）には対応していない。エラーにはならず「ブックマークされていない」扱いになる

**レスポンス**

- `data.entries[0]` が対象URLのエントリー情報。`content` がはてなの `/entry/json/` の結果そのもの
  - **ブックマークされていないURLの場合、`content` は `null`**（エラーではない）
- そのエントリーページ自体がブックマークされている（メタブ）場合は、`entries[1]` 以降に上の階層を順に入れる（最大10件）
- `data.floor` は渡したURLが何階層目か。通常のURLは `1`、ブックマークページを渡すと `2` 以上
- `data.error` が `true` のときは、途中で取得に失敗している。`entries` は取得できたところまで
  - 1件目で失敗した場合は、`entries[0]` が `error: true` と `message` を持つ（`content` は `null`）
  - ステータスは200のまま

**エラー**

| ステータス | 条件 | `message` |
|---|---|---|
| 400 | `url` がない、空、配列で渡された | `urlパラメータが付与されていません` |
| 400 | `url` がhttp(s)でない、2048文字を超える | `urlパラメータが不正です` |

### `GET /shb/v1/stars?url={URL}`

`detail` と同じ階ごとに、エントリー本体（記事のURL）とブックマークへのはてなスターの数を返す。
はてなスターの公式API（[スター取得API](https://developer.hatena.ne.jp/ja/documents/star/apis/entry/)）はCORSに対応していないので、このAPIを通して取得する。

スキーマ: `stars.schema.json`（200のとき）、`error.schema.json`（400のとき）

**パラメータ**

- `url`（必須）: `detail` と同じ。扱い（エントリーページのURLを元の記事として扱う、400になる条件）も同じ
- `force_fetch`（任意）: 後述。取り直すのはスターだけで、エントリー情報は `detail` のキャッシュを使う

**レスポンス**

```json
{
  "data": {
    "floor": 1,
    "entries": [
      {
        "eid": "4795124686327499586",
        "entry": {
          "uri": "https://example.com/article",
          "stars": { "total": 3, "colors": { "yellow": 2, "green": 1 } }
        },
        "bookmarks": {
          "alice": { "total": 2, "colors": { "yellow": 2 } }
        }
      }
    ],
    "error": false
  }
}
```

- `data.floor`・`data.entries` の並びは `detail` と同じ（`entries[0]` が対象URL、`entries[1]` 以降がメタブの上の階層）。`eid` で `detail` の `content.eid` と対応づけられる
- `entry.stars`: エントリー本体へのスター。スターがなければ `null`
  - 問い合わせるのは `detail` の `content.url`。はてなブログなど、記事のページでつけられたスターも含まれる
- `bookmarks`: ユーザー名（`detail` の `bookmarks[].user`）をキーにした、そのユーザーのブックマークへのスター
  - **スターのついたブックマークだけを入れる。** なければ空のオブジェクト `{}`
  - コメントのないブックマークも対象
- スターの数
  - `total`: すべての色の合計
  - `colors`: 色ごとの数。0の色は入れない。色は `yellow`（通常のスター）・`green`・`red`・`blue`・`purple`
  - スターが多いとはてな側で途中が省略されるが、省略された分も数に含めている。同じ人が複数つけたスター（`count`）も数に含める
- ブックマークされていないURL（`detail` の `content` が `null`）の場合は、`eid` が `null`、`bookmarks` が `{}` で、渡したURLへのスターだけを返す
- `data.error` が `true` のときは、`detail` の取得またははてなスターへの問い合わせが一部失敗している。取得できた分だけ返す（失敗した分はスターがないように見える）
  - `detail` 側で取得に失敗した階は `entries` に含めない。1件目で失敗した場合は `entries` が空になる
  - ステータスは200のまま

**エラー**

`detail` と同じ（400）。

## キャッシュ

- API側で結果を5分間キャッシュしている。5分以内の同じリクエストには同じ内容が返る
  - `detail` と `stars` は `url` の文字列ごとにキャッシュする（エンコード前の文字列が1文字でも違えば別扱い）。`stars` のキャッシュは `detail` とは別
- レスポンスの `last_modified` はデータを取得した日時、`expires` はキャッシュが切れる日時
- HTTPヘッダーにも `Cache-Control: public, max-age={残り秒数}` と `Expires` を付けている。ブラウザのキャッシュもこれに従う
- **取得に失敗したものを含むレスポンス（`entries` の一部のフィードが `error`、`detail`・`stars` の `data.error` が `true`）はキャッシュしない。** `Cache-Control: no-store` になり、次のリクエストで取得し直す
  - この場合も JSON の `expires` は5分後の値になっているので、ヘッダーのほうを信じる
- エラー（400 / 500）も `Cache-Control: no-store`

### `force_fetch`

`?force_fetch`（値は何でもよい）を付けると、キャッシュを使わずにはてなから取得し直す（`detail` では `?url=...&force_fetch=1`）。
`stars` で取り直すのはスターだけで、エントリー情報は `detail` のキャッシュがあればそれを使う。

- 本番では、キャッシュ作成から60秒経っていない場合は無視され、キャッシュが返る。エラーにはならないので、`last_modified` を見れば取り直されたかどうか分かる
- ブラウザのキャッシュは別なので、クエリが同じだとブラウザのキャッシュが返ることがある

## 応答時間

キャッシュがある場合はすぐ返る。キャッシュが切れている場合は、はてなから取得するので時間がかかる。

- `entries`: 20本のフィードを並列で取得する
- `detail`: メタブの階層を1つずつ順に取得するので、階層が深いとそのぶん長くなる
- `stars`: `detail` のキャッシュがなければ先に `detail` と同じ取得をする。そのあと、はてなスターに50件ずつ（同時に3件まで）問い合わせる。ブックマークが多いほど長くなる（121件で約0.5秒）。`detail` を表示したあとで取得し、表示を待たせないようにする
- はてなへの1リクエストのタイムアウトは30秒。はてなが応答しないと、レスポンスまで30秒以上かかることがある。フロントエンド側でもタイムアウトやローディング表示を用意しておく

## そのほかのエラー

- 500: サーバー側の問題（キャッシュの作成に失敗したなど）。`error.schema.json` の形で返る
- 存在しないパスは404、内部のファイルへのアクセスは403。これらはJSONではなく、サーバーのHTMLが返る
