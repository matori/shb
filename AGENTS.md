# AGENTS.md

しんぷるはてぶ（https://shb.unformedbuilding.com）のフロントエンド。

## 変更してはいけないファイル

- `docs/frontend-api.md`（APIの仕様書）と `schema/`（APIレスポンスのJSONスキーマ）は、メンテナーがAPIのリポジトリからコピーしてくるもの
- エージェントはこれらを編集・削除・移動・整形しない
- 実装と内容が食い違っていても、これらを直さずにメンテナーに報告する

## 開発

- Node.jsのバージョンは `.node-version`（asdfで管理）
- Svelte 5（runes）+ Vite
- `npm run dev`: 本番APIで開発サーバーを起動
- `npm run dev:dummy`: ダミーAPI（`scripts/`）で開発サーバーを起動
- `npm run build`: `public/` にビルド
- `npm run validate:mock`: ダミーAPIのデータを `schema/` で検証
- `npm run format`: Prettierで整形

## 実装の方針

- 標準機能（Web標準のAPI、JavaScriptの組み込み機能、CSS）でできることは標準機能を使う
- 標準機能でできないことは、自前で実装する前に、利用者が多くメンテナンスが続いているライブラリの採用を検討する

## 作業の進め方

- ファイルを変更する前に、計画を示してメンテナーの確認を取る（相談だけのこともある）
- 作業はブランチを切ってから行い、作業単位でコミットする
- コミットメッセージは日本語
