<script>
  import BookmarksItemAvatar from "~/components/bookmarks/BookmarksItemAvatar.svelte"
  import BookmarksItemBody from "~/components/bookmarks/BookmarksItemBody.svelte"
  import BookmarksItemDate from "~/components/bookmarks/BookmarksItemDate.svelte"
  import BookmarksItemCommentPermalink from "~/components/bookmarks/BookmarksItemCommentPermalink.svelte"

  let { bookmark, eid, class: className = "", ...rest } = $props()

  const userUrl = $derived(`https://b.hatena.ne.jp/${bookmark.user}/`)
</script>

<div {...rest} class={[className, "BookmarksItemContent"]}>
  <BookmarksItemAvatar user={bookmark.user} url={userUrl} class="BookmarksItemContent-avatar" />
  <BookmarksItemBody
    user={bookmark.user}
    {userUrl}
    comment={bookmark.comment}
    commentParts={bookmark.commentParts}
    tags={bookmark.tags}
    class="BookmarksItemContent-body"
  />
  {#if bookmark.comment}
    <BookmarksItemCommentPermalink user={bookmark.user} {eid} class="BookmarksItemContent-permalink" />
  {/if}
  <BookmarksItemDate {eid} user={bookmark.user} timestamp={bookmark.timestamp} class="BookmarksItemContent-date" />
</div>

<style>
  :global {
    .BookmarksItemContent {
      display: grid;
      grid-template-columns: min-content 1fr min-content min-content;
      grid-template-rows: repeat(2, auto);
      column-gap: calc(var(--line) * 0.5);
      row-gap: 2px;
      padding: calc(var(--line) * 0.5) calc(var(--line) * 0.75);
    }

    .BookmarksItemContent-avatar {
      grid-column: 1 / 2;
      grid-row: 1 / 3;
    }

    .BookmarksItemContent-body {
      grid-column: 2 / 5;
      grid-row: 1 / 2;
      min-width: 0;
    }

    .BookmarksItemContent-permalink {
      grid-column: 3 / 4;
      grid-row: 2 / 3;
    }

    .BookmarksItemContent-date {
      grid-column: 4 / 5;
      grid-row: 2 / 3;
    }
  }
</style>
