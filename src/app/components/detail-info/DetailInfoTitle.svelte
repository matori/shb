<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import Link from "~/elements/Link"

  let title
  let url
  let multiLine
  export { title, url, multiLine }

  const removeAttrs = createNullValueObject(["title", "url", "multiLine"])
</script>

<template>
  <h3 {...$$props} {...removeAttrs} class="{$$props.class || ''} DetailInfoTitle {multiLine ? '' : '_singleLine'}">
    <Link {url} class="DetailInfoTitle-link">{ title }</Link>
  </h3>
</template>

<style lang="scss" global>
  .DetailInfoTitle {
    @include text(2);
    margin: 0;
    font-weight: var(--fw-normal);

    &._singleLine {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .DetailInfoTitle-link {
    overflow-wrap: break-word;
    color: var(--color-text-blue);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
