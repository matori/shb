<script>
  import { entryDetail } from "~/store/entryDetail.svelte.js"
  import Link from "~/elements/Link.svelte"
  import LoadingIcon from "~/components/common/LoadingIcon.svelte"

  // 右のパネル。エントリーを開いていないときに、このページの説明を表示する
  let { class: className = "", ...rest } = $props()

  const headingId = $props.id()
</script>

<section {...rest} class={[className, "Information"]} aria-labelledby={headingId}>
  <header class="Information-header">
    <h2 id={headingId} class="Information-heading">
      インフォメーション
      <LoadingIcon loading={entryDetail.isLoading} />
    </h2>
  </header>
  <div class="Information-body">
    <div class="Information-content ScrollShadow">
      <p class="Information-intro">
        「しんぷるはてぶ」は、はてなブックマークの全カテゴリーの人気・新着エントリーを、1画面で見られるようにしたページです。
        <br />
        たくさんの情報を並べるため、横幅が 1280px 以上の画面がおすすめです。文字の大きさとコンテンツの最大幅は、設定で変えられます。
      </p>
      <div class="Information-inner">
        <section>
          <h3>使い方</h3>
          <p>
            左の「エントリーの一覧」で、カテゴリーと人気・新着を切り替えられます。一覧のブックマーク数をクリックすると、このインフォメーションのかわりに、そのエントリーの情報とコメントの一覧を表示します。
          </p>
          <p>マウスやキーボードでの詳しい操作は、右上の「使い方」で確認できます。</p>
        </section>
        <section>
          <h3>注意事項など</h3>
          <ul>
            <li>
              エントリーの一覧とエントリーの情報は取得元が異なり、サーバー側でもキャッシュしているため、ブックマーク数がずれることがあります。
            </li>
            <li>サーバーのキャッシュの有効期限は、作成から5分後です。</li>
            <li>設定と画面の表示状態は、このブラウザー（ローカルストレージ）に保存しています。</li>
            <li>
              バグの報告や機能の要望は、<Link url="https://github.com/matori/shb/issues">GitHubリポジトリのIssue</Link
              >にお願いします。
            </li>
          </ul>
        </section>
        <section>
          <h3>v2で変わったこと</h3>
          <ul>
            <li>デザインを新しくし、ダークモードに対応しました。設定の「表示テーマ」で切り替えられます。</li>
            <li>
              コメントとエントリーに、はてなスターの数を表示するようにしました。コメントは、スターの多い順にも並べ替えられます。
            </li>
            <li>
              コメントの中の <code>@ユーザー名</code>（X）と
              <code>anond:</code>（はてな匿名ダイアリー）をリンクにしました。括弧で囲まれたURLも正しくリンクになります。
            </li>
            <li>設定で、文字の大きさとコンテンツの最大幅を変えられるようになりました。</li>
            <li>
              キーボードで、人気・新着とカテゴリーを切り替えられるようになりました（設定で有効にします）。Escape
              キーで、エントリーの情報のパネルを閉じられます。
            </li>
            <li>
              一覧のブックマーク数をミドルクリックすると、はてなブックマークのエントリーページを新しいタブで開きます。
            </li>
            <li>右上に「使い方」を追加しました。</li>
            <li>読み上げソフトやキーボードでも使いやすくしました。</li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</section>

<style>
  :global {
    /* 詳細パネルと同じく、見出しの行と本文をつなげて1枚のパネルに見せる */
    .Information {
      display: grid;
      grid-template-rows: min-content 1fr;
    }

    .Information-header {
      border-radius: var(--radius-panel) var(--radius-panel) 0 0;
      padding: calc(var(--line) * 0.6) calc(var(--line) * 0.75) 0;
      background-color: var(--color-surface);
    }

    .Information-heading {
      font-size: var(--fs-l);
      line-height: var(--lh-l);
      display: flex;
      align-items: center;
      margin: 0;
      font-weight: var(--fw-bold);
    }

    .Information-body {
      min-height: 0;
    }

    .Information-content {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      box-sizing: border-box;
      border-radius: 0 0 var(--radius-panel) var(--radius-panel);
      padding: calc(var(--line) * 0.25) calc(var(--line) * 0.75) calc(var(--line) * 0.75);
      max-height: 100%;
      overflow-y: auto;
      color: var(--color-text-sub);
    }

    .Information-intro {
      margin-top: calc(var(--line) * 0.5);
      margin-bottom: calc(var(--line) * 0.5);
    }

    .Information-inner {
      h3 {
        font-size: var(--fs-m);
        line-height: var(--lh-m);
        margin-top: var(--line);
        margin-bottom: 0;
        color: var(--color-text);
        font-weight: var(--fw-bold);
      }

      p,
      ul {
        margin-top: calc(var(--line) * 0.4);
        margin-bottom: calc(var(--line) * 0.4);
      }

      ul {
        padding-left: var(--line);
      }

      li + li {
        margin-top: calc(var(--line) * 0.2);
      }

      code {
        border-radius: 4px;
        padding: 0 0.3em;
        background-color: var(--color-surface-sub);
        font-family: var(--ff-mono);
      }
    }
  }
</style>
