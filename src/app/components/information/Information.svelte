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
        「しんぷるはてぶ」は、はてなブックマーク全カテゴリーの新規エントリーを1画面で閲覧することを目的としたページです。
        <br />
        コンセプトの関係上、小さい画面だと見づらくなりますので、WXGA+ (1440x900) 以上の画面サイズがおすすめです。
      </p>
      <div class="Information-inner">
        <section>
          <h3>使い方</h3>
          <p>
            「エントリーの一覧」はそのまま新規の人気エントリーと新着エントリーの一覧です。タブを切り替えて表示できます。
            <br />
            リスト内のブックマーク数をクリックすると、現在表示されている「インフォメーション」にかわって、選択したエントリーの情報とブックマーク一覧が表示されます。
          </p>
        </section>
        <section>
          <h3>注意事項など</h3>
          <ul>
            <li>
              エントリーの一覧とエントリー情報のソースが異なっているのと、サーバー側でもキャッシュしている関係上、ブックマーク数にズレが発生する可能性があります。
            </li>
            <li>サーバーのキャッシュ有効期限は作成から5分後です。</li>
            <li>UIの状態などの保存にローカルストレージを利用しています。</li>
            <li>
              バグ報告や機能追加の要望は<Link url="https://github.com/matori/shb/issues">GitHubリポジトリのIssue</Link
              >にお願いします。
            </li>
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
    }
  }
</style>
