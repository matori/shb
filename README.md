# しんぷるはてぶ

はてなブックマークの全カテゴリーの人気エントリー・新着エントリーを、1画面で見るためのページです。

- サイト: https://shb.unformedbuilding.com
- このリポジトリはフロントエンドです。データは別リポジトリのAPI（`https://api.unformedbuilding.com/shb/v1/`）から取得しています

## 必要なもの

- Node.js: バージョンは `.node-version` に書いてあります（24以上が必要）。[asdf](https://asdf-vm.com/) を使う場合は、`legacy_version_file = yes` を設定すると `.node-version` を読みます
- npm（Node.js に付属のもの）

## セットアップ

```bash
npm install
```

## 開発

本番のAPIを使って開発サーバーを起動します（http://localhost:3000）。

```bash
npm run dev
```

ダミーAPIを使う場合は、次のコマンドで起動します。

```bash
npm run dev:dummy
```

### ダミーAPI

`npm run dev:dummy` のときだけ、開発サーバーの `/api` 以下でダミーAPIが動きます（`scripts/`）。使い方の一覧は、起動中に http://localhost:3000/api を開くと表示されます。

- `/api/entries`: `scripts/api/data/entries.json` を返します。総合の人気エントリーの先頭に、下のダミーの詳細を開くためのエントリーがあります
- `/api/detail?url=...`: エントリーの詳細を返します
  - `url` が `scripts/api/data/details/` にあるファイル名（拡張子なし）か、`https://example.com/dummy/{名前}` のときは、そのファイルを返します（`simple`、`complex`、`partial`、`idcall` など）
  - `slow` / `veryslow` は応答を5秒 / 90秒遅らせ、`servererror` は500エラーを返します
  - それ以外は、詳細データを自動生成して返します
- 本番APIと同じく、`url` の不備には400、存在しないパスにはHTMLの404を返します

ダミーデータが本番APIのJSONスキーマに沿っているかは、次のコマンドで確認できます。

```bash
npm run validate:mock
```

### APIの仕様

APIの仕様は [`docs/frontend-api.md`](docs/frontend-api.md)、レスポンスの形は [`schema/`](schema/) のJSONスキーマが正です。どちらもAPIのリポジトリからコピーしたものなので、このリポジトリでは編集しません。

### 接続先の設定

APIのURLは `env/` の環境変数ファイルで切り替えています（Viteの `envDir`）。

- `env/.env`: 本番API（`npm run dev`、`npm run build`）
- `env/.env.dummy`: ダミーAPI（`npm run dev:dummy`）

## ビルド

```bash
npm run build
```

`public/` に出力します。ビルド結果を手元で確認するときは `npm run preview` を使います。

## 整形

```bash
npm run format
```

[Prettier](https://prettier.io/)（Svelte用のプラグイン付き）で整形します。

## 技術構成

- [Svelte 5](https://svelte.dev/)（runes）
- [Vite](https://vite.dev/)
- スタイルはプレーンなCSS（CSSのネスト、カスタムプロパティ）。色・角丸などは [`src/app/assets/styles/global.css`](src/app/assets/styles/global.css) にまとめています。ダークモードは `light-dark()` で切り替えています

## ディレクトリ構成

```
.
├── docs/            APIの仕様書（APIのリポジトリからコピー）
├── schema/          APIレスポンスのJSONスキーマ（APIのリポジトリからコピー）
├── env/             APIの接続先の設定
├── scripts/         ダミーAPIと、ダミーデータの検証スクリプト
├── src/app/
│   ├── components/  画面の部品。画面の場所ごとのディレクトリ（header・main・entries・entry-detail・entry-info・bookmarks・information）と、共通の部品（common）
│   ├── elements/    ボタン・リンクなどの基本の部品
│   ├── store/       状態の管理（APIのデータ、画面の表示状態、設定）。$state を使う .svelte.js
│   ├── utils/       共通の処理
│   ├── constants/   カテゴリー・アイコンなどの定数
│   └── assets/      全体のスタイル
├── static/icons/    アイコンの元のSVG（コードでは src/app/constants/iconPaths.js にパスを持っている）
└── index.html
```

## デプロイ

`master` に push すると、GitHub Actions（[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)）がビルドし、rsync でサーバーに転送します。

## AIエージェント向けの指示

[`AGENTS.md`](AGENTS.md) にあります（`CLAUDE.md` はこれを読み込むだけです）。
