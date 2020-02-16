<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import Link from "~/elements/Link"
  import Icon from "~/elements/Icon"

  let user
  let eid
  export { user, eid }

  const removeAttrs = createNullValueObject(["user", "eid"])

  const url = `https://b.hatena.ne.jp/entry/${eid}/comment/${user}`
</script>

<template>
  <Link
    {...$$props}
    {...removeAttrs}
    {url}
    class="{$$props.class || ''} BookmarksItemCommentPermalink"
    title="コメントのパーマリンク"
  >
    <Icon name="link" class="BookmarksItemCommentPermalink-icon" aria-hidden="true" />
    <span class="BookmarksItemCommentPermalink-label">Permalink</span>
  </Link>
</template>

<style lang="scss" global>
  .BookmarksItemCommentPermalink {
    @include text(-2);
    display: flex;
    align-items: center;
    color: var(--color-text-steel);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .BookmarksItemCommentPermalink-icon {
    @include icon-size(-4);
    margin-right: 0.25em;
  }

  .BookmarksItemCommentPermalink-label {
    white-space: nowrap;
  }
</style>
