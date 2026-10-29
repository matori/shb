<script>
  import { showAllBookmarks, reverseOrderBookmarks } from "~/store/ui"
  import LinkBox from "~/components/common/LinkBox.svelte"
  import BookmarksHeader from "~/components/bookmarks/BookmarksHeader"
  import BookmarksList from "~/components/bookmarks/BookmarksList"

  let { content, class: className = "", ...rest } = $props()

  let scrollContainer

  const orderedBookmarks = $derived.by(() => {
    const bookmarks = $showAllBookmarks
      ? [...content.bookmarks]
      : content.bookmarks.filter((bookmark) => bookmark.comment)
    return $reverseOrderBookmarks ? bookmarks.reverse() : bookmarks
  })

  // 表示するブックマークが変わったら先頭までスクロールを戻す
  $effect.pre(() => {
    orderedBookmarks
    if (scrollContainer) {
      scrollContainer.scrollTop = 0
    }
  })
</script>

<div {...rest} class={[className, "Bookmarks", "ScrollShadow"]} bind:this={scrollContainer}>
  <BookmarksHeader {content} class="Bookmarks-header" />
  <div class="Bookmarks-body" aria-label="コメントのリスト">
    {#if orderedBookmarks.length}
      <BookmarksList bookmarks={orderedBookmarks} eid={content.eid} class="Bookmarks-list" />
    {:else}
      <p class="Bookmarks-message">表示できるブックマークがありません</p>
    {/if}
    <p class="Bookmarks-helper">
      <LinkBox url={content.entry_url} class="Bookmarks-link">この一覧をはてなブックマークで見る</LinkBox>
    </p>
  </div>
</div>

<style>
  :global {
    .Bookmarks {
      display: grid;
      grid-template-rows: min-content 1fr;
      position: relative;
      min-height: 0;
      overflow-y: auto;
      border-top: 1px solid var(--color-line);

      &:focus:not(:focus-visible) {
        outline: none;
      }
    }

    .Bookmarks-header {
      position: sticky;
      top: 0;
      z-index: 1;
      border-bottom: 1px solid var(--color-line);
      background-color: var(--color-surface);
    }

    .Bookmarks-message {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      margin: 0;
      border-bottom: 1px solid var(--color-line);
      padding: var(--line);
      color: var(--color-text-muted);
      text-align: center;
    }

    .Bookmarks-helper {
      margin: 0;
      padding: var(--line);
      text-align: center;
    }
  }
</style>
