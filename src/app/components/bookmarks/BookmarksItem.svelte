<script>
  import BookmarksItemContent from "~/components/bookmarks/BookmarksItemContent.svelte"
  import BookmarksItemIdCalls from "~/components/bookmarks/BookmarksItemIdCalls.svelte"

  let { bookmark, eid, class: className = "", ...rest } = $props()
</script>

<li {...rest} class={[className, "BookmarksItem"]}>
  <BookmarksItemContent {bookmark} {eid} class="BookmarksItem-main" />
  {#if bookmark.idCalls || bookmark.idCalled}
    <div class="BookmarksItem-sub">
      <BookmarksItemIdCalls {bookmark} {eid} class="BookmarksItem-idCalls" />
    </div>
  {/if}
</li>

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
