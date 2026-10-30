<script>
  import { onMount } from "svelte"
  import ENTRY_CATEGORIES from "~/constants/entryCategories"
  import ENTRY_TYPES from "~/constants/entryTypes"
  import { entryFeeds } from "~/store/entryFeeds.svelte.js"
  import { viewState } from "~/store/viewState.svelte.js"
  import Button from "~/elements/Button.svelte"
  import Icon from "~/elements/Icon.svelte"
  import Tabs from "~/components/common/Tabs.svelte"
  import EntryFeed from "~/components/entries/EntryFeed.svelte"

  // 左のパネル。カテゴリーごとの人気・新着エントリーの一覧
  let { class: className = "", ...rest } = $props()

  const headingId = $props.id()

  onMount(() => {
    entryFeeds.load({ isInitialLoad: true })
  })

  // 読み込み中は押せないようにするが、disabled にするとフォーカスが外れるので aria-disabled にする
  function refresh() {
    if (!entryFeeds.isLoading) {
      entryFeeds.load()
    }
  }
</script>

<section {...rest} class={[className, "EntriesPanel"]} aria-labelledby={headingId}>
  <header class="EntriesPanel-header">
    <h2 id={headingId} class="EntriesPanel-heading">エントリーの一覧</h2>
    <!-- 人気・新着はすべてのカテゴリーに共通なので、カテゴリーのタブより上に1つだけ置く -->
    <div class="EntriesPanel-types" role="group" aria-label="エントリーの種類">
      {#each ENTRY_TYPES as type, index (type.key)}
        <Button
          class="EntriesPanel-type"
          aria-pressed={viewState.selectedEntryTypeIndex === index}
          onclick={() => (viewState.selectedEntryTypeIndex = index)}
        >
          {type.label}
        </Button>
      {/each}
    </div>
    <Button class="EntriesPanel-refresh" aria-disabled={entryFeeds.isLoading} onclick={refresh}>
      <Icon name="sync" class="EntriesPanel-refreshIcon" />
      更新
    </Button>
  </header>
  <!-- 中身が入ったときに読み上げられるよう、知らせる場所は常に置いておく -->
  <div role="status">
    {#if entryFeeds.errorMessage && entryFeeds.hasLoaded}
      <p class="EntriesPanel-notice">
        一覧の更新に失敗したため、前回取得した一覧を表示しています（{entryFeeds.errorMessage}）
      </p>
    {/if}
  </div>
  <div class="EntriesPanel-body">
    <Tabs
      tabs={ENTRY_CATEGORIES}
      label="カテゴリー"
      selected={viewState.selectedCategoryIndex}
      tabListClass="ScrollShadowX"
      class="EntriesPanel-tabs"
      onselect={(index) => (viewState.selectedCategoryIndex = index)}
    >
      {#snippet children({ key, label })}
        <EntryFeed category={{ key, label }} />
      {/snippet}
    </Tabs>
  </div>
</section>

<style>
  :global {
    .EntriesPanel {
      display: grid;
      grid-template-rows: min-content min-content 1fr;
      border-radius: var(--radius-panel);
      overflow: hidden;
      background-color: var(--color-surface);
    }

    /* 文字を大きくして1行に入らないときは、見出しの途中ではなく、要素ごとに折り返す */
    .EntriesPanel-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: calc(var(--line) * 0.5);
      padding: calc(var(--line) * 0.6) calc(var(--line) * 0.75) calc(var(--line) * 0.4);
    }

    .EntriesPanel-heading {
      font-size: var(--fs-l);
      line-height: var(--lh-l);
      margin: 0;
      font-weight: var(--fw-bold);
      white-space: nowrap;
    }

    .EntriesPanel-types {
      display: inline-flex;
      gap: 2px;
      border-radius: var(--radius-pill);
      padding: 3px;
      background-color: var(--color-surface-sub);
    }

    .EntriesPanel-type {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      border-radius: var(--radius-pill);
      padding: 0.1em 1.4em;
      color: var(--color-text-sub);
      white-space: nowrap;

      &:hover {
        color: var(--color-text);
      }

      &[aria-pressed="true"] {
        background-color: var(--color-surface);
        color: var(--color-text);
        font-weight: var(--fw-bold);
        box-shadow: var(--shadow-selected);
      }
    }

    .EntriesPanel-refresh {
      margin-left: auto;
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      display: flex;
      align-items: center;
      gap: 0.25em;
      border-radius: var(--radius-pill);
      padding: 0.15em 0.8em;
      color: var(--color-accent);
      font-weight: var(--fw-medium);
      white-space: nowrap;

      &:hover {
        background-color: var(--color-surface-sub);
      }

      &[aria-disabled="true"] {
        opacity: 0.7;
        cursor: not-allowed;

        &:hover {
          background-color: transparent;
        }
      }
    }

    .EntriesPanel-refreshIcon {
      width: calc(var(--fs-s) * var(--lh-s));
      height: calc(var(--fs-s) * var(--lh-s));
      animation-duration: 1s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;

      .EntriesPanel-refresh[aria-disabled="true"] & {
        animation-name: syncing;
      }
    }

    .EntriesPanel-notice {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      margin: 0;
      padding: 0 calc(var(--line) * 0.75) calc(var(--line) * 0.4);
      color: var(--color-error);
    }

    .EntriesPanel-body {
      min-height: 0;
    }

    /*
     * カテゴリーは下線のタブにして、人気・新着の切り替えボタンと見た目を分ける
     * 1行に並べ、幅が余るときは各タブを広げてパネルの幅に合わせ、足りないときは横にスクロールする
     */
    .EntriesPanel-tabs > .Tabs-tabList {
      gap: 0;
      overflow-x: auto;
      padding: 0 calc(var(--line) * 0.5);
      box-shadow: inset 0 -1px var(--color-line);
      scrollbar-width: thin;

      .Tabs-tabItem {
        flex: 1 0 auto;
      }

      .Tabs-tab {
        position: relative;
        border-radius: 0;
        padding: 0.35em 0.6em 0.45em;
        width: 100%;
        background-color: transparent;
        color: var(--color-text-sub);
        text-align: center;

        &::after {
          position: absolute;
          right: 0.6em;
          bottom: 0;
          left: 0.6em;
          border-radius: 2px 2px 0 0;
          height: 3px;
          content: "";
        }

        &:hover {
          background-color: transparent;
          color: var(--color-text);

          &::after {
            background-color: var(--color-line-strong);
          }
        }

        &[aria-selected="true"] {
          color: var(--color-accent);
          font-weight: var(--fw-bold);

          &::after {
            background-color: var(--color-accent);
          }
        }
      }
    }
  }
</style>
