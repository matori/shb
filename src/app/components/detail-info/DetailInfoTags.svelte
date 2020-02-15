<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import List from "~/elements/List"
  import Link from "~/elements/Link"
  import Icon from "~/elements/Icon"

  let tags
  export { tags }

  const removeAttrs = createNullValueObject(["tags"])
</script>

<template>
  <div {...$$props} {...removeAttrs} class="{$$props.class || ''} DetailInfoTags">
    <div class="DetailInfoTags-prefix" aria-hidden="true">
      <Icon name="tag" class="DetailInfoTags-icon" />
    </div>
    <List class="DetailInfoTags-list" aria-label="このエントリーにつけられた主なタグ">
      {#each tags as tag}
        <li class="DetailInfoTags-item">
          <Link url="{tag.url}" class="DetailInfoTags-link">{tag.label}</Link>
        </li>
      {/each}
    </List>
  </div>
</template>

<style lang="scss" global>
  .DetailInfoTags {
    @include text(-1);
    display: flex;
    align-items: flex-start;
    overflow: hidden;
    color: var(--color-text-gray);
  }

  .DetailInfoTags-prefix {
    flex-grow: 0;
    flex-shrink: 0;
    padding-top: rem($config-line-gap / 2);
    padding-bottom: rem($config-line-gap / 2);
    width: 1em;
    height: 1em;
  }

  .DetailInfoTags-icon {
    display: block;
    width: 100%;
    height: 100%;
  }

  .DetailInfoTags-list {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
  }

  .DetailInfoTags-item {
    margin-left: 0.5em;
  }

  .DetailInfoTags-link {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
