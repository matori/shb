<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import List from "~/elements/List"
  import BookmarksItem from "~/components/bookmarks/BookmarksItem"

  let bookmarks
  let eid
  export { bookmarks, eid }

  const removeAttrs = createNullValueObject(["bookmarks", "eid"])
</script>

<List {...$$props} {...removeAttrs} ordered={true} class="{$$props.class || ''} BookmarksList">
  {#each bookmarks as bookmark, index (bookmark.user)}
    <BookmarksItem {bookmark} {eid} class="BookmarksList-item" />
  {/each}
</List>

<style lang="scss" global>
  .BookmarksList {
  }

  .BookmarksList-item {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--color-border-base);
  }
</style>
