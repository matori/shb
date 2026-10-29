<script>
  import BookmarksItemAvatar from "~/components/bookmarks/BookmarksItemAvatar"
  import BookmarksItemBody from "~/components/bookmarks/BookmarksItemBody.svelte"
  import BookmarksItemDate from "~/components/bookmarks/BookmarksItemDate"
  import BookmarksItemCommentPermalink from "~/components/bookmarks/BookmarksItemCommentPermalink"

  let { bookmark, eid, class: className = "", ...rest } = $props()

  const userUrl = $derived(`https://b.hatena.ne.jp/${bookmark.user}/`)
</script>

<div {...rest} class={[className, "BookmarksItemContent"]}>
  <BookmarksItemAvatar user={bookmark.user} url={userUrl} class="BookmarksItemContent-avatar" />
  <BookmarksItemBody
    user={bookmark.user}
    {userUrl}
    comment={bookmark.comment}
    commentTexts={bookmark.commentTexts}
    tags={bookmark.tags}
    class="BookmarksItemContent-body"
  />
  {#if bookmark.comment}
    <BookmarksItemCommentPermalink user={bookmark.user} {eid} class="BookmarksItemContent-permalink" />
  {/if}
  <BookmarksItemDate {eid} user={bookmark.user} timestamp={bookmark.timestamp} class="BookmarksItemContent-date" />
</div>

<style lang="scss" global>
  .BookmarksItemContent {
    display: grid;
    grid-template-columns: min-content 1fr min-content min-content;
    grid-template-rows: repeat(2, auto);
    column-gap: get-lines(0.5);
    row-gap: (get-lines(0.25) - $line-edge);
    padding: (get-lines(0.5) - $line-edge) (get-lines(0.25) + $line-edge);
  }

  .BookmarksItemContent-avatar {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 3;
  }

  .BookmarksItemContent-body {
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row-start: 1;
    grid-row-end: 2;
  }

  .BookmarksItemContent-permalink {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 3;
  }

  .BookmarksItemContent-date {
    grid-column-start: 4;
    grid-column-end: 5;
    grid-row-start: 2;
    grid-row-end: 3;
  }
</style>
