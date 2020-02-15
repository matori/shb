<script>
  import { detailFetchProcessing } from "~/store/detail"
  import links from "~/data/links"
  import Link from "~/elements/Link.svelte"
  import Icon from "~/elements/Icon.svelte"
</script>

<template>
  <section {...$$props} class="{$$props.class || ''} Information">
    <header class="Information-header">
      <h2 class="Information-heading">
        インフォメーション
        <Icon name="refresh" class="Information-icon {$detailFetchProcessing ? '_show' : ''}" />
      </h2>
    </header>
    <div class="Information-body">
      <div class="Information-content">
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
                Googleアナリティクスを使用しています。その情報収集の際、Cookieが使用されます。Googleがデータをどのように扱い、処理するのかについてはGoogleの「<Link url="https://policies.google.com/technologies/partner-sites">ポリシーと規約</Link>」を参照してください。
              </li>
              <li>バグ報告や機能追加の要望はGitHubのリポジトリからお願いします。</li>
            </ul>
          </section>
          <section>
            <h3>リンク集</h3>
            <p>はてなブックマークをもっと楽しむためのツール集。</p>
            <dl>
              {#each links as item, index}
                <dt>
                  <Link url="{item.url}">{item.name}</Link>
                </dt>
                <dd>{item.description}</dd>
              {/each}
            </dl>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" global>
  .Information {
    display: grid;
    grid-template-rows: min-content 1fr;
    row-gap: get-lines(0.5) - rem($config-line-gap / 2);
  }

  .Information-header {
    padding-right: get-lines(0.25);
    padding-left: get-lines(0.25);
  }

  .Information-heading {
    @include text(-1);
    display: flex;
    margin: 0;
    font-weight: var(--fw-normal);
  }

  .Information-icon {
    @include icon-size(-1);
    margin-left: 0.25em;
    opacity: 0;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;

    &._show {
      opacity: 1;
      animation-name: syncing;
    }
  }

  .Information-body {
    min-height: 0;
  }

  .Information-content {
    @include text(0);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: var(--color-border-base);
    max-height: 100%;
    overflow-y: auto;
    background-color: var(--color-bg-content);
    padding: get-lines(0.5) (get-lines(0.5) + rem($config-line-gap / 2));
  }

  .Information-intro {
    margin: 0;
  }

  .Information-inner {
    h3 {
      @include text(1);
      margin-top: get-lines(1.5);
      margin-bottom: 0;
      font-weight: var(--fw-bold);
    }

    p,
    ul,
    dl {
      margin-top: get-lines(0.5);
      margin-bottom: 0;
    }

    ul {
      padding-left: get-lines(1);
    }

    dt {
      margin-top: get-lines(0.5);
    }

    dd {
      margin-left: get-lines(1);
    }

    a {
      color: var(--color-text-blue);
    }
  }
</style>
