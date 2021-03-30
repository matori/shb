<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import { detailData } from "~/store/detail"
  import EntryListItemLink from "~/components/entry-list/EntryListItemLink"
  import EntryListItemBookmarkCount from "~/components/entry-list/EntryListItemBookmarkCount"
  import EntryListItemSite from "~/components/entry-list/EntryListItemSite"
  import EntryListItemTime from "~/components/entry-list/EntryListItemTime"

  let item
  export { item }

  const removeAttrs = createNullValueObject(["item"])

  function onClickBookmarkCount(event) {
    event.preventDefault()
    detailData.update(item)
  }
</script>

<template>
  <li {...$$props} {...removeAttrs} class="{$$props.class || ''} EntryListItem">
    <EntryListItemLink url="{item.url}" title="{item.title}" class="EntryListItem-title" />
    <EntryListItemBookmarkCount
      count="{item.bookmarkCount}"
      class="EntryListItem-count"
      on:click="{onClickBookmarkCount}"
    />
    <EntryListItemSite url="{item.siteEntriesUrl}" label="{item.siteEntriesLabel}" favicon="{item.favicon}" class="EntryListItem-site" />
    <EntryListItemTime datetime="{item.date}" class="EntryListItem-date" />
  </li>
</template>

<style lang="scss" global>
  .EntryListItem {
    display: grid;
    grid-template-columns: min-content 1fr 1fr;
    grid-template-rows: repeat(2, min-content);
    gap: get-lines(0.25);
    padding-top: get-lines(0.5) - $line-edge;
    padding-right: get-lines(0.25) + $line-edge;
    padding-bottom: get-lines(0.5) - $line-edge;
    padding-left: get-lines(0.25);
  }

  .EntryListItem-title {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 2;
    min-width: 0;
  }

  .EntryListItem-count {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 3;
  }

  .EntryListItem-site {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    min-width: 0;
  }

  .EntryListItem-date {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 3;
  }
</style>
