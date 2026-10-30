<script>
  import Button from "~/elements/Button.svelte"
  import Dialog from "~/components/common/Dialog.svelte"

  // 使い方。設定なしで使える操作を説明し、ショートカットは設定画面へ案内する
  // - onopensettings: 「設定を開く」を押したとき。使い方を閉じて設定を開くのは、使う側で行う
  let { open = $bindable(false), onopensettings } = $props()
</script>

<Dialog label="使い方" bind:open>
  <div class="UsageDialog">
    <h2 class="UsageDialog-title">使い方</h2>

    <section class="UsageDialog-section">
      <h3 class="UsageDialog-heading">画面の見方</h3>
      <p>
        左に、はてなブックマークの全カテゴリーの人気・新着エントリーの一覧があります。人気・新着の切り替えは、すべてのカテゴリーに共通です。
      </p>
      <p>
        一覧のブックマーク数を押すと、右にそのエントリーの情報とコメントの一覧を表示します。コメントは、はてなスターの多い順などに並べ替えられます。
      </p>
    </section>

    <section class="UsageDialog-section">
      <h3 class="UsageDialog-heading">マウスでの操作</h3>
      <dl class="UsageDialog-operations">
        <dt>一覧のブックマーク数をクリック</dt>
        <dd>エントリーの情報とコメントを表示する</dd>
        <dt>
          一覧のブックマーク数をミドルクリック、または <kbd>Ctrl</kbd>（Mac は <kbd>Cmd</kbd>）を押しながらクリック
        </dt>
        <dd>はてなブックマークのエントリーページを、新しいタブで開く</dd>
      </dl>
    </section>

    <section class="UsageDialog-section">
      <h3 class="UsageDialog-heading">キーボードでの操作</h3>
      <dl class="UsageDialog-operations">
        <dt><kbd>Tab</kbd>・<kbd>Shift</kbd> + <kbd>Tab</kbd></dt>
        <dd>リンクやボタンを順に移る</dd>
        <dt><kbd>←</kbd>・<kbd>→</kbd>・<kbd>Home</kbd>・<kbd>End</kbd></dt>
        <dd>カテゴリーやコメントの階のタブを切り替える（タブを選んでいるとき）</dd>
        <dt><kbd>Escape</kbd></dt>
        <dd>エントリーの情報とコメントのパネルを閉じる。ダイアログが開いているときは、ダイアログを閉じる</dd>
      </dl>
      <p>
        人気・新着とカテゴリーを1文字のキーで切り替えるキーボードショートカットもあります。初期設定では無効です。有効にする方法とキーの一覧は、設定画面で確認できます。
      </p>
      <p>
        <Button class="UsageDialog-settingsButton" aria-haspopup="dialog" onclick={() => onopensettings?.()}>
          設定を開く
        </Button>
      </p>
    </section>

    <section class="UsageDialog-section">
      <h3 class="UsageDialog-heading">設定でできること</h3>
      <p>
        表示テーマ（ライト・ダーク）、文字の大きさ、コンテンツの最大幅、エントリーの一覧の自動更新の間隔、ヘッダーのリンク集、キーボードショートカットを変えられます。設定はこのブラウザーに保存されます。
      </p>
    </section>
  </div>
</Dialog>

<style>
  :global {
    .UsageDialog {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      box-sizing: border-box;
      border-radius: var(--radius-panel);
      padding: var(--line);
      min-width: calc(var(--content-min-width) * 0.6);
      max-width: 44em;
      background-color: var(--color-surface);
      color: var(--color-text-sub);

      p {
        margin: calc(var(--line) * 0.4) 0;
      }
    }

    .UsageDialog-title {
      font-size: var(--fs-xl);
      line-height: var(--lh-xl);
      margin: 0 0 calc(var(--line) * 0.5);
      color: var(--color-text);
      font-weight: var(--fw-bold);
    }

    .UsageDialog-section {
      margin-top: var(--line);
    }

    .UsageDialog-heading {
      font-size: var(--fs-m);
      line-height: var(--lh-m);
      margin: 0;
      color: var(--color-text);
      font-weight: var(--fw-bold);
    }

    .UsageDialog-operations {
      display: grid;
      grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
      gap: calc(var(--line) * 0.4) var(--line);
      margin: calc(var(--line) * 0.5) 0;

      dt {
        color: var(--color-text);
      }

      dd {
        margin: 0;
      }
    }

    .UsageDialog-settingsButton {
      border: 1px solid var(--color-line-strong);
      border-radius: var(--radius-pill);
      padding: 0.25em 1em;
      color: var(--color-accent);

      &:hover {
        background-color: var(--color-surface-sub);
      }
    }
  }
</style>
