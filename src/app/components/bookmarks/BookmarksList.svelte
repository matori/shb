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

<style>
  :global {
    .BookmarksList {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .BookmarksList-item {
      border-bottom: 1px solid var(--color-line);
    }
  }
</style>
