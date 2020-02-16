<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import BookmarksItemContent from "~/components/bookmarks/BookmarksItemContent.svelte"
  import BookmarksItemIdCalls from "~/components/bookmarks/BookmarksItemIdCalls.svelte"

  let bookmark
  let eid
  export { bookmark, eid }

  const removeAttrs = createNullValueObject(["bookmark", "eid"])
</script>

<template>
  <li {...$$props} {...removeAttrs} class="{$$props.class || ''} BookmarksItem">
    <BookmarksItemContent {bookmark} {eid} class="BookmarksItem-main" />
    {#if bookmark.idCalls || bookmark.idCalled}
      <div class="BookmarksItem-sub">
        <BookmarksItemIdCalls {bookmark} {eid} class="BookmarksItem-idCalls" />
      </div>
    {/if}
  </li>
</template>

<style lang="scss" global>
  .BookmarksItem {
  }

  .BookmarksItem-main {
  }

  .BookmarksItem-sub {
    padding-left: calc(#{get-lines(0.25) + $line-edge} + 16px);
  }

  .BookmarksItem-idCalls {
  }
</style>
