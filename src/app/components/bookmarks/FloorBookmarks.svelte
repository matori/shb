<script module>
  const percentFormatter = new Intl.NumberFormat("ja-JP", { style: "percent", maximumFractionDigits: 1 })

  // total に対する part の割合を「66.7%」の形にする。total が0で計算できないときは null
  function formatPercentage(part, total) {
    return total ? percentFormatter.format(part / total) : null
  }
</script>

<script>
  import { viewState } from "~/store/viewState.svelte.js"
  import userCountUnit from "~/utils/userCountUnit"
  import Icon from "~/elements/Icon.svelte"
  import Link from "~/elements/Link.svelte"
  import List from "~/elements/List.svelte"
  import HatenaBookmarkLink from "~/components/common/HatenaBookmarkLink.svelte"
  import BookmarkListItem from "~/components/bookmarks/BookmarkListItem.svelte"

  // 1つの階のブックマーク数の統計と、コメント一覧
  // - content: detail API の、その階の content
  let { content, class: className = "", ...rest } = $props()

  let scrollContainer

  const visibleBookmarks = $derived.by(() => {
    const bookmarks = viewState.includeBookmarksWithoutComment
      ? [...content.bookmarks]
      : content.bookmarks.filter((bookmark) => bookmark.comment)
    return viewState.showOldestBookmarksFirst ? bookmarks.reverse() : bookmarks
  })

  const totalCount = $derived(content.count)
  const publicCount = $derived(content.bookmarks.length)
  const publicPercentage = $derived(formatPercentage(publicCount, totalCount))
  const commentCount = $derived(content.bookmarks.filter((bookmark) => bookmark.comment).length)
  const commentPercentage = $derived(formatPercentage(commentCount, publicCount))

  // 表示するブックマークが変わったら先頭までスクロールを戻す
  $effect.pre(() => {
    visibleBookmarks
    if (scrollContainer) {
      scrollContainer.scrollTop = 0
    }
  })
</script>

<div {...rest} class={[className, "FloorBookmarks"]}>
  <p class="FloorBookmarks-stats">
    <Link url={content.entry_url} class="FloorBookmarks-total">{totalCount}{userCountUnit(totalCount)}</Link>
    <span class="FloorBookmarks-stat">
      <Icon name="public" title="公開ブックマーク数" class="FloorBookmarks-statIcon" />
      {publicCount}
      {#if publicPercentage !== null}
        <span class="FloorBookmarks-percentage" title="全体ブックマーク数に対する公開ブックマーク数のパーセンテージ">
          {publicPercentage}
        </span>
      {/if}
    </span>
    <span class="FloorBookmarks-stat">
      <Icon name="comment" title="コメント数" class="FloorBookmarks-statIcon" />
      {commentCount}
      {#if commentPercentage !== null}
        <span class="FloorBookmarks-percentage" title="公開ブックマーク数に対するコメント数のパーセンテージ">
          {commentPercentage}
        </span>
      {/if}
    </span>
  </p>
  <!-- 統計の行がスクロールの影を隠さないよう、スクロールするのはコメントの部分だけにする -->
  <div class="FloorBookmarks-body ScrollShadow" bind:this={scrollContainer}>
    {#if visibleBookmarks.length}
      <List ordered class="FloorBookmarks-list" aria-label="ブックマークの一覧">
        {#each visibleBookmarks as bookmark (bookmark.user)}
          <BookmarkListItem {bookmark} eid={content.eid} class="FloorBookmarks-item" />
        {/each}
      </List>
    {:else}
      <p class="FloorBookmarks-empty">表示できるブックマークがありません</p>
    {/if}
    <p class="FloorBookmarks-hatenaLink">
      <HatenaBookmarkLink url={content.entry_url}>この一覧をはてなブックマークで見る</HatenaBookmarkLink>
    </p>
  </div>
</div>

<style>
  :global {
    .FloorBookmarks {
      display: grid;
      grid-template-rows: min-content 1fr;
      min-height: 0;
      height: 100%;
      border-top: 1px solid var(--color-line);
    }

    .FloorBookmarks-stats {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: flex;
      align-items: center;
      gap: calc(var(--line) * 0.6);
      margin: 0;
      border-bottom: 1px solid var(--color-line);
      padding: calc(var(--line) * 0.4) calc(var(--line) * 0.75);
      color: var(--color-text-sub);
    }

    .FloorBookmarks-total {
      font-size: var(--fs-s);
      color: var(--color-count);
      font-weight: var(--fw-bold);
      text-decoration: none;

      &:hover {
        color: var(--color-count);
        text-decoration: underline;
      }
    }

    .FloorBookmarks-stat {
      display: flex;
      align-items: center;
      gap: 0.25em;
      font-variant-numeric: tabular-nums;
    }

    .FloorBookmarks-statIcon {
      width: 1.1em;
      height: 1.1em;
      color: var(--color-text-muted);
    }

    .FloorBookmarks-percentage {
      color: var(--color-text-muted);

      &::before {
        content: "(";
      }

      &::after {
        content: ")";
      }
    }

    .FloorBookmarks-body {
      min-height: 0;
      overflow-y: auto;
    }

    .FloorBookmarks-item {
      border-bottom: 1px solid var(--color-line);
    }

    .FloorBookmarks-empty {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      margin: 0;
      border-bottom: 1px solid var(--color-line);
      padding: var(--line);
      color: var(--color-text-muted);
      text-align: center;
    }

    .FloorBookmarks-hatenaLink {
      margin: 0;
      padding: var(--line);
      text-align: center;
    }
  }
</style>
