<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import Link from "~/elements/Link"

  let url
  let label
  let favicon
  export { url, label, favicon }

  const removeAttrs = createNullValueObject(["url", "label", "favicon"])
</script>

<template>
  <span {...$$props} {...removeAttrs} class="{$$props.class || ''} DetailInfoSite">
    <Link {url} class="DetailInfoSite-link">
      <img src="{favicon}" class="DetailInfoSite-favicon" alt="" />
      <span class="DetailInfoSite-label">{label}</span>
    </Link>
  </span>
</template>

<style lang="scss" global>
  .DetailInfoSite {
    @include text(-2);
    display: flex;
    align-items: flex-end;
  }

  .DetailInfoSite-link {
    display: inline-flex;
    align-items: center;
    max-width: 100%;
    color: var(--color-text-steel);
    vertical-align: bottom;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .DetailInfoSite-favicon {
    flex-grow: 0;
    flex-shrink: 0;
    margin-right: 0.25em;
    width: 16px;
    height: 16px;
    object-fit: contain;
  }

  .DetailInfoSite-label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
