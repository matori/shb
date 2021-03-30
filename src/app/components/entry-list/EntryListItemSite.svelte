<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import Link from "~/elements/Link"

  let url
  let label
  let favicon
  export { url, label, favicon }

  const removeAttrs = createNullValueObject(["label", "favicon"])
</script>

<template>
  <span {...$$props} {...removeAttrs} class="{$$props.class || ''} EntryListItemSite">
    <Link {url} class="EntryListItemSite-link">
      <span class="EntryListItemSite-favicon" aria-hidden="true" style="content: url({favicon})"></span>
      <span class="EntryListItemSite-label">{label}</span>
    </Link>
  </span>
</template>

<style lang="scss" global>
  .EntryListItemSite {
    padding-right: $line-edge;
  }

  .EntryListItemSite-link {
    @include text(-2);
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

  .EntryListItemSite-favicon {
    flex-grow: 0;
    flex-shrink: 0;
    margin-right: 0.25em;
    width: 16px;
    height: 16px;
    object-fit: contain;
  }

  .EntryListItemSite-label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
