<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import DetailInfoDescription from "~/components/detail-info/DetailInfoDescription"
  import DetailInfoImage from "~/components/detail-info/DetailInfoImage"
  import DetailInfoTags from "~/components/detail-info/DetailInfoTags"
  import DetailInfoSearchTwitter from "~/components/detail-info/DetailInfoSearchTwitter"

  let detailContent
  let itemData
  let detailInfoExpanded
  export { detailContent, itemData, detailInfoExpanded }

  const removeAttrs = createNullValueObject(["detailContent", "itemData", "detailInfoExpanded"])
</script>

<template>
  <div
    {...$$props}
    {...removeAttrs}
    class="{$$props.class || ''} DetailInfoBody {itemData.image ? '_hasImage' : ''}
    {itemData.tags.length ? ' _hasTags' : ''}
    {detailInfoExpanded ? '' : '_hidden'}"
  >
    <DetailInfoDescription text="{itemData.description}" class="DetailInfoBody-description" />
    {#if itemData.image}
      <DetailInfoImage image="{itemData.image}" class="DetailInfoBody-image" />
    {/if}
    {#if itemData.tags.length}
      <DetailInfoTags tags="{itemData.tags}" class="DetailInfoBody-tags" />
    {/if}
    <DetailInfoSearchTwitter url="{detailContent.url}" class="DetailInfoBody-twitter" />
  </div>
</template>

<style lang="scss" global>
  .DetailInfoBody {
    $c-gap: get-lines(0.25) + $line-edge;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: min-content 1fr;
    column-gap: $c-gap;
    row-gap: get-lines(0.5);

    &._hasImage {
      grid-template-columns: 1fr fit-content(calc(30% - #{$c-gap / 2}));
    }

    &._hasTags {
      grid-template-rows: min-content min-content 1fr;
    }

    &._hidden {
      display: none;
    }
  }

  .DetailInfoBody-description {
    grid-column-start: 1;
    grid-column-end: 2;
    min-width: 0;
  }

  .DetailInfoBody-image {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 4;
  }

  .DetailInfoBody-tags {
    grid-column-start: 1;
    grid-column-end: 2;
    min-width: 0;
  }

  .DetailInfoBody-twitter {
    grid-column-start: 1;
    grid-column-end: 2;
  }
</style>
