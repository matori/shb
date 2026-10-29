<script>
  import List from "~/elements/List"
  import BookmarksItem from "~/components/bookmarks/BookmarksItem"

  let { bookmarks, eid, class: className = "", ...rest } = $props()
</script>

<List {...rest} ordered={true} class={[className, "BookmarksList"]}>
  {#each bookmarks as bookmark (bookmark.user)}
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
