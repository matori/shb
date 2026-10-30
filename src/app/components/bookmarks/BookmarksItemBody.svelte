<script>
  import BookmarksItemUser from "~/components/bookmarks/BookmarksItemUser.svelte"
  import BookmarksItemComment from "~/components/bookmarks/BookmarksItemComment.svelte"
  import BookmarksItemTags from "~/components/bookmarks/BookmarksItemTags.svelte"

  let { user, userUrl, comment, commentTexts, tags, class: className = "", ...rest } = $props()
</script>

<div {...rest} class={[className, "BookmarksItemBody"]}>
  <BookmarksItemUser {user} url={userUrl} class="BookmarksItemBody-user" />
  {#if comment}
    <BookmarksItemComment {commentTexts} class="BookmarksItemBody-comment" />
  {/if}
  {#if tags.length}
    <BookmarksItemTags {user} {tags} class="BookmarksItemBody-tags" />
  {/if}
</div>

<style>
  :global {
    .BookmarksItemBody {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      display: grid;
      row-gap: 2px;
    }

    .BookmarksItemBody-comment {
      min-width: 0;
      word-break: break-all;
    }
  }
</style>
