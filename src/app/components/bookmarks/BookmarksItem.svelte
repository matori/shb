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

<style>
  :global {
    .BookmarksItem-sub {
      padding-left: calc(var(--line) * 0.75 + 32px);
      padding-right: calc(var(--line) * 0.5);
      padding-bottom: calc(var(--line) * 0.5);
    }
  }
</style>
