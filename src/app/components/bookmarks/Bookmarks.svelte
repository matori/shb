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

<div {...rest} class={[className, "Bookmarks"]} bind:this={scrollContainer}>
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

<style lang="scss" global>
  .Bookmarks {
    @include focus-clear-without-keyboard;
    display: grid;
    grid-template-rows: min-content 1fr;
    position: relative;
    min-height: 0;
    overflow-y: scroll;
  }

  .Bookmarks-header {
    position: sticky;
    top: 0;
    border-bottom-width: 3px;
    border-bottom-style: solid;
    border-bottom-color: var(--color-border-base);
    background-color: var(--color-bg-content);
  }

  .Bookmarks-body {
  }

  .Bookmarks-list {
  }

  .Bookmarks-message {
    margin: 0;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--color-border-base);
    padding: 1.75rem 0.75rem;
    font-size: var(--font-size-small);
    line-height: (18 / 14) * 1em;
  }

  .Bookmarks-helper {
    margin: 0;
    padding: get-lines(1);
    text-align: center;
  }

  .Bookmarks-link {
  }
</style>
