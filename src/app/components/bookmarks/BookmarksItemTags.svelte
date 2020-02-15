<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import Icon from "~/elements/Icon"
  import Link from "~/elements/Link"
  import List from "~/elements/List"

  let user
  let tags = []
  export { user, tags }

  const removeAttrs = createNullValueObject(["user", "tags"])

  const userTags = tags.map(tag => {
    return {
      label: tag,
      url: `http://b.hatena.ne.jp/${user}/${encodeURIComponent(tag)}/`,
    }
  })
</script>

<template>
  <div {...$$props} {...removeAttrs} class="{$$props.class || ''} BookmarksItemTags">
    <div class="BookmarksItemTags-prefix">
      <Icon name="tag" class="BookmarksItemTags-icon" aria-hidden="true" />
    </div>
    <List class="BookmarksItemTags-list" aria-label="{user}がつけたタグ">
      {#each userTags as tag (tag.url)}
        <li class="BookmarksItemTags-item">
          <Link url="{tag.url}" class="BookmarksItemTags-link">{tag.label}</Link>
        </li>
      {/each}
    </List>
  </div>
</template>

<style lang="scss" global>
  .BookmarksItemTags {
    display: flex;
    color: var(--color-text-gray);
  }

  .BookmarksItemTags-prefix {
    flex-grow: 0;
    flex-shrink: 0;
    margin-right: 0.25em;
    padding-top: rem($config-line-gap / 2);
    padding-bottom: rem($config-line-gap / 2);
    width: 1em;
    height: 1em;
  }

  .BookmarksItemTags-icon {
    display: block;
    width: 100%;
    height: 100%;
  }

  .BookmarksItemTags-list {
  }

  .BookmarksItemTags-item {
    display: inline;
    margin-right: 0.25em;
    word-break: break-word;
  }

  .BookmarksItemTags-link {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
