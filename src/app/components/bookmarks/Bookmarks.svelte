<script>
  import { viewState } from "~/store/viewState.svelte.js"
  import HatenaBookmarkLink from "~/components/common/HatenaBookmarkLink.svelte"
  import BookmarksHeader from "~/components/bookmarks/BookmarksHeader.svelte"
  import BookmarksList from "~/components/bookmarks/BookmarksList.svelte"

  let { content, class: className = "", ...rest } = $props()

  let scrollContainer

  const orderedBookmarks = $derived.by(() => {
    const bookmarks = viewState.includeBookmarksWithoutComment
      ? [...content.bookmarks]
      : content.bookmarks.filter((bookmark) => bookmark.comment)
    return viewState.showOldestBookmarksFirst ? bookmarks.reverse() : bookmarks
  })

  // 表示するブックマークが変わったら先頭までスクロールを戻す
  $effect.pre(() => {
    orderedBookmarks
    if (scrollContainer) {
      scrollContainer.scrollTop = 0
    }
  })
</script>

<div {...rest} class={[className, "Bookmarks"]}>
  <BookmarksHeader {content} class="Bookmarks-header" />
  <!-- 統計の行がスクロールの影を隠さないよう、スクロールするのはコメントの部分だけにする -->
  <div class="Bookmarks-body ScrollShadow" aria-label="コメントのリスト" bind:this={scrollContainer}>
    {#if orderedBookmarks.length}
      <BookmarksList bookmarks={orderedBookmarks} eid={content.eid} class="Bookmarks-list" />
    {:else}
      <p class="Bookmarks-message">表示できるブックマークがありません</p>
    {/if}
    <p class="Bookmarks-helper">
      <HatenaBookmarkLink url={content.entry_url} class="Bookmarks-link"
        >この一覧をはてなブックマークで見る</HatenaBookmarkLink
      >
    </p>
  </div>
</div>

<style>
  :global {
    .Bookmarks {
      display: grid;
      grid-template-rows: min-content 1fr;
      min-height: 0;
      border-top: 1px solid var(--color-line);
    }

    .Bookmarks-header {
      border-bottom: 1px solid var(--color-line);
    }

    .Bookmarks-body {
      min-height: 0;
      overflow-y: auto;
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
