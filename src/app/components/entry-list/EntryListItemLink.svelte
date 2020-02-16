<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import Link from "~/elements/Link"

  let url
  let title
  export { url, title }

  const removeAttrs = createNullValueObject(["url", "title"])
</script>

<template>
  <div {...$$props} {...removeAttrs} class="{$$props.class || ''} EntryListItemLink">
    <Link {url} class="EntryListItemLink-link">{title}</Link>
  </div>
</template>

<style lang="scss" global>
  .EntryListItemLink {
  }

  .EntryListItemLink-link {
    @include text(-1);
    color: var(--color-text-blue);
    text-decoration: none;
    overflow-wrap: break-word;

    &:visited {
      color: var(--color-text-gray);
    }

    &:hover {
      text-decoration: underline;
    }
  }
</style>
