<script>
  import percentage from "~/utils/percentage"
  import Icon from "~/elements/Icon"
  import Link from "~/elements/Link.svelte"

  let { content, class: className = "", ...rest } = $props()

  const totalCount = $derived(content.count)
  const totalCountSuffix = $derived(totalCount > 1 ? "users" : "user")
  const publicCount = $derived(content.bookmarks.length)
  const publicPercentage = $derived(percentage(publicCount, totalCount, 1))
  const commentCount = $derived(content.bookmarks.filter((bookmark) => bookmark.comment).length)
  const commentPercentage = $derived(percentage(commentCount, publicCount, 1))
</script>

<p {...rest} class={[className, "BookmarksHeader"]}>
  <span class="BookmarksHeader-total">
    <Link url={content.entry_url} class="BookmarksHeader-link">{totalCount}{totalCountSuffix}</Link>
  </span>
  <span class="BookmarksHeader-data">
    <Icon name="public" role="img" class="BookmarksHeader-icon" title="公開ブックマーク数" />
    <span class="BookmarksHeader-count">{publicCount}</span>
    {#if publicPercentage !== null}
      <span class="BookmarksHeader-percentage" title="全体ブックマーク数に対する公開ブックマーク数のパーセンテージ">
        {publicPercentage}%
      </span>
    {/if}
  </span>
  <span class="BookmarksHeader-data">
    <Icon name="comment" role="img" class="BookmarksHeader-icon" title="コメント数" />
    <span class="BookmarksHeader-count">{commentCount}</span>
    {#if commentPercentage !== null}
      <span class="BookmarksHeader-percentage" title="公開ブックマーク数に対するコメント数のパーセンテージ">
        {commentPercentage}%
      </span>
    {/if}
  </span>
</p>

<style>
  :global {
    .BookmarksHeader {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: flex;
      align-items: center;
      gap: calc(var(--line) * 0.6);
      margin: 0;
      padding: calc(var(--line) * 0.4) calc(var(--line) * 0.75);
      color: var(--color-text-sub);
    }

    .BookmarksHeader-link {
      font-size: var(--fs-s);
      color: var(--color-count);
      font-weight: var(--fw-bold);
      text-decoration: none;

      &:hover {
        color: var(--color-count);
        text-decoration: underline;
      }
    }

    .BookmarksHeader-data {
      display: flex;
      align-items: center;
      gap: 0.25em;
      font-variant-numeric: tabular-nums;
    }

    .BookmarksHeader-icon {
      width: 1.1em;
      height: 1.1em;
      color: var(--color-text-muted);
    }

    .BookmarksHeader-percentage {
      color: var(--color-text-muted);

      &::before {
        content: "(";
      }

      &::after {
        content: ")";
      }
    }
  }
</style>
