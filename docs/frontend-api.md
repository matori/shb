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

## キャッシュ

- API側で結果を5分間キャッシュしている。5分以内の同じリクエストには同じ内容が返る
  - `detail` は `url` の文字列ごとにキャッシュする（エンコード前の文字列が1文字でも違えば別扱い）
- レスポンスの `last_modified` はデータを取得した日時、`expires` はキャッシュが切れる日時
- HTTPヘッダーにも `Cache-Control: public, max-age={残り秒数}` と `Expires` を付けている。ブラウザのキャッシュもこれに従う
- **取得に失敗したものを含むレスポンス（`entries` の一部のフィードが `error`、`detail` の `data.error` が `true`）はキャッシュしない。** `Cache-Control: no-store` になり、次のリクエストで取得し直す
  - この場合も JSON の `expires` は5分後の値になっているので、ヘッダーのほうを信じる
- エラー（400 / 500）も `Cache-Control: no-store`

### `force_fetch`

`?force_fetch`（値は何でもよい）を付けると、キャッシュを使わずにはてなから取得し直す（`detail` では `?url=...&force_fetch=1`）。

- 本番では、キャッシュ作成から60秒経っていない場合は無視され、キャッシュが返る。エラーにはならないので、`last_modified` を見れば取り直されたかどうか分かる
- ブラウザのキャッシュは別なので、クエリが同じだとブラウザのキャッシュが返ることがある

## 応答時間

キャッシュがある場合はすぐ返る。キャッシュが切れている場合は、はてなから取得するので時間がかかる。

- `entries`: 20本のフィードを並列で取得する
- `detail`: メタブの階層を1つずつ順に取得するので、階層が深いとそのぶん長くなる
- はてなへの1リクエストのタイムアウトは30秒。はてなが応答しないと、レスポンスまで30秒以上かかることがある。フロントエンド側でもタイムアウトやローディング表示を用意しておく

## そのほかのエラー

- 500: サーバー側の問題（キャッシュの作成に失敗したなど）。`error.schema.json` の形で返る
- 存在しないパスは404、内部のファイルへのアクセスは403。これらはJSONではなく、サーバーのHTMLが返る
