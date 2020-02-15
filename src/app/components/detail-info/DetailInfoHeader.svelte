<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import DetailInfoTitle from "~/components/detail-info/DetailInfoTitle"
  import DetailInfoSite from "~/components/detail-info/DetailInfoSite"
  import DetailInfoDate from "~/components/detail-info/DetailInfoDate"
  import DetailInfoCategory from "~/components/detail-info/DetailInfoCategory"
  import DetailInfoBookmarkCount from "~/components/detail-info/DetailInfoBookmarkCount"

  let detailContent
  let itemData
  let detailInfoExpanded
  export { detailContent, itemData, detailInfoExpanded }

  const removeAttrs = createNullValueObject(["detailContent", "itemData", "detailInfoExpanded"])
</script>

<template>
  <header {...$$props} {...removeAttrs} class="{$$props.class || ''} DetailInfoHeader">
    <DetailInfoTitle
      title="{detailContent.title}"
      url="{detailContent.url}"
      multiLine="{detailInfoExpanded}"
      class="DetailInfoHeader-title"
    />
    <DetailInfoBookmarkCount
      url="{detailContent.entry_url}"
      count="{detailContent.count}"
      class="DetailInfoHeader-bookmark"
    />
    <DetailInfoCategory
      slug="{itemData.realCategory.slug}"
      label="{itemData.realCategory.label}"
      class="DetailInfoHeader-category"
    />
    <DetailInfoSite
      url="{itemData.siteEntriesUrl}"
      label="{itemData.siteEntriesLabel}"
      favicon="{itemData.favicon}"
      class="DetailInfoHeader-site"
    />
    <DetailInfoDate datetime="{itemData.date}" class="DetailInfoHeader-date" title="最初にブックマークされた日時" />
  </header>
</template>

<style lang="scss" global>
  .DetailInfoHeader {
    display: grid;
    grid-template-columns: min-content min-content 1fr min-content;
    grid-auto-rows: auto;
    row-gap: get-lines(0.5);
    column-gap: get-lines(0.5);
  }

  .DetailInfoHeader-title {
    grid-column-start: 1;
    grid-column-end: 5;
    min-width: 0;
  }

  .DetailInfoHeader-bookmark {
    grid-column-start: 1;
    grid-column-end: 2;
  }

  .DetailInfoHeader-category {
    grid-column-start: 2;
    grid-column-end: 3;
  }

  .DetailInfoHeader-site {
    grid-column-start: 3;
    grid-column-end: 4;
    min-width: 0;
  }

  .DetailInfoHeader-date {
    grid-column-start: 4;
    grid-column-end: 5;
  }
</style>
