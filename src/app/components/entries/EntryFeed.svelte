<script>
  import ENTRY_TYPES from "~/constants/entryTypes"
  import { entryFeeds } from "~/store/entryFeeds.svelte.js"
  import { viewState } from "~/store/viewState.svelte.js"
  import List from "~/elements/List.svelte"
  import FetchError from "~/components/common/FetchError.svelte"
  import HatenaBookmarkLink from "~/components/common/HatenaBookmarkLink.svelte"
  import EntryListItem from "~/components/entries/EntryListItem.svelte"

  // 1つのカテゴリーの、選ばれている種類（人気・新着）のエントリーの一覧。種類の切り替えは EntriesPanel にある
  let { category, class: className = "", ...rest } = $props()

  const type = $derived(ENTRY_TYPES[viewState.selectedEntryTypeIndex] ?? ENTRY_TYPES[0])
  const feed = $derived(entryFeeds.feed(category.key, type.key))
  const errorTitle = "一覧取得の際にエラーが発生しました"
</script>

<div {...rest} class={[className, "EntryFeed", "ScrollShadow"]}>
  <h3 class="VisuallyHidden">カテゴリー「{category.label}」の{type.label}エントリー</h3>
  {#if feed.initializing}
    <p class="EntryFeed-loading">読み込み中です</p>
  {:else if entryFeeds.errorMessage && !entryFeeds.hasLoaded}
    <FetchError
      title={errorTitle}
      cause="connection"
      message={entryFeeds.errorMessage}
      headingLevel={4}
      class="EntryFeed-error"
    />
  {:else if feed.error}
    <FetchError title={errorTitle} cause="api" message={feed.message} headingLevel={4} class="EntryFeed-error" />
  {:else if feed.items.length}
    <List class="EntryFeed-list">
      <!-- 同じURLのエントリーが重なっても表示が壊れないよう、順番をキーにする -->
      {#each feed.items as entry, index (index)}
        <EntryListItem {entry} class="EntryFeed-item" />
      {/each}
    </List>
  {:else}
    <p class="EntryFeed-empty">表示できるアイテムがありません。</p>
  {/if}
  <p class="EntryFeed-hatenaLink">
    <HatenaBookmarkLink url="https://b.hatena.ne.jp/{type.key}/{category.key}">
      「{category.label}」の{type.label}エントリーをはてなブックマークで見る
    </HatenaBookmarkLink>
  </p>
</div>

<style>
  :global {
    .EntryFeed {
      height: 100%;
      /* 読み上げ用に隠した文字（position: absolute）を、ページではなくこのスクロールの中に置く。ないとページに縦スクロールバーが出る */
      position: relative;
      overflow-y: auto;
    }

    .EntryFeed-loading,
    .EntryFeed-empty {
      font-size: var(--fs-m);
      line-height: var(--lh-m);
      margin: 0;
      padding: var(--line);
      color: var(--color-text-muted);
      text-align: center;
    }

    .EntryFeed-loading {
      border-bottom: 1px solid var(--color-line);
    }

    .EntryFeed-error {
      border-bottom: 1px solid var(--color-line);
      padding: var(--line);
    }

    .EntryFeed-list {
      padding: 0 calc(var(--line) * 0.25);
    }

    .EntryFeed-item {
      border-bottom: 1px solid var(--color-line);

      /* カテゴリーのタブと近すぎないよう、先頭のエントリーだけ上の余白を広げる */
      &:first-child {
        padding-top: calc(var(--line) * 0.75);
      }
    }

    .EntryFeed-hatenaLink {
      margin: 0;
      padding: var(--line);
      text-align: center;
    }
  }
</style>
