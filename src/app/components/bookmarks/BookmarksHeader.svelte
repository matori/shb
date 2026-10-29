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
    <span class="BookmarksHeader-percentage" title="全体ブックマーク数に対する公開ブックマーク数のパーセンテージ">
      {publicPercentage}%
    </span>
  </span>
  <span class="BookmarksHeader-data">
    <Icon name="comment" role="img" class="BookmarksHeader-icon" title="コメント数" />
    <span class="BookmarksHeader-count">{commentCount}</span>
    <span class="BookmarksHeader-percentage" title="公開ブックマーク数に対するコメント数のパーセンテージ">
      {commentPercentage}%
    </span>
  </span>
</p>

<style lang="scss" global>
  .BookmarksHeader {
    display: flex;
    align-items: center;
    margin: 0;
    padding: get-lines(0.5) (get-lines(0.25) + $line-edge);
  }

  .BookmarksHeader-total {
    @include text(0);
  }

  .BookmarksHeader-link {
    color: var(--color-text-red);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .BookmarksHeader-data {
    @include text(0);
    display: flex;
    align-items: center;
    margin-left: get-lines(0.5);
  }

  .BookmarksHeader-icon {
    @include icon-size(-3);
  }

  .BookmarksHeader-count {
    margin-left: 0.25em;
  }

  .BookmarksHeader-percentage {
    margin-left: 0.25em;

    &::before {
      margin-right: 0.1em;
      content: "(";
    }

    &::after {
      margin-left: 0.1em;
      content: ")";
    }
  }
</style>
