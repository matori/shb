<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import percentage from "~/utils/percentage"
  import Icon from "~/elements/Icon"
  import Link from "~/elements/Link.svelte"

  let content
  export { content }

  const removeAttrs = createNullValueObject(["content"])

  let totalCount
  let totalCountSuffix
  let publicCount
  let publicPercentage
  let commentCount
  let commentPercentage
  let url

  $: {
    totalCount = content.count
    totalCountSuffix = totalCount > 1 ? "users" : "user"
    publicCount = content.bookmarks.length
    publicPercentage = percentage(publicCount, totalCount, 1)
    commentCount = content.bookmarks.filter(bookmark => bookmark.comment).length
    commentPercentage = percentage(commentCount, publicCount, 1)
    url = content.entry_url
  }
</script>

<template>
  <p {...$$props} {...removeAttrs} class="{$$props.class || ''} BookmarksHeader">
    <span class="BookmarksHeader-total">
      <Link {url} class="BookmarksHeader-link">{totalCount}{totalCountSuffix}</Link>
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
</template>

<style lang="scss" global>
  .BookmarksHeader {
    display: flex;
    align-items: center;
    margin: 0;
    padding: get-lines(0.5) (get-lines(0.25) + rem($config-line-gap / 2));
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
