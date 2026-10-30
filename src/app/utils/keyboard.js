// ページ全体で受けるキー操作（Escape でパネルを閉じる、キーボードショートカット）の共通の判定

// 修飾キーを押しているか。ブラウザーや OS のショートカットと重ならないよう、押しているときは何もしない
function hasModifierKey(event) {
  return event.altKey || event.ctrlKey || event.metaKey || event.shiftKey
}

// ページ全体のキー操作を受けつけないときか
// - ほかの処理がすでにキーを使った
// - 日本語の入力で変換している途中（Escape で変換を取り消したいだけのことがある）
// - モーダルのダイアログが開いている（ダイアログが自分でキーを受ける）
function isPageKeyboardBlocked(event, doc = document) {
  return event.defaultPrevented || event.isComposing || doc.querySelector("dialog[open]") !== null
}

export { hasModifierKey, isPageKeyboardBlocked }
