<script>
  import Bookmark from "~/components/bookmarks/Bookmark.svelte"
  import IdCallRelations from "~/components/bookmarks/IdCallRelations.svelte"

  // コメント一覧の1件。IDコールの関係があれば、その下に表示する
  let { bookmark, eid, class: className = "", ...rest } = $props()
</script>

<li {...rest} class={[className, "BookmarkListItem"]}>
  <Bookmark {bookmark} {eid} />
  {#if bookmark.idCallsTo || bookmark.idCalledBy}
    <div class="BookmarkListItem-idCalls">
      <IdCallRelations {bookmark} {eid} />
    </div>
  {/if}
</li>

<style>
  :global {
    .BookmarkListItem-idCalls {
      padding-left: calc(var(--line) * 0.75 + 32px);
      padding-right: calc(var(--line) * 0.5);
      padding-bottom: calc(var(--line) * 0.5);
    }
  }
</style>
