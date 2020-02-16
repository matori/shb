<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import BookmarksItemAvatar from "~/components/bookmarks/BookmarksItemAvatar"
  import BookmarksItemBody from "~/components/bookmarks/BookmarksItemBody.svelte"
  import BookmarksItemDate from "~/components/bookmarks/BookmarksItemDate"
  import BookmarksItemCommentPermalink from "~/components/bookmarks/BookmarksItemCommentPermalink"

  let bookmark
  let eid
  export { bookmark, eid }

  const removeAttrs = createNullValueObject(["bookmark", "eid"])

  const { user, comment, commentTexts, tags, timestamp } = bookmark

  $: userUrl = `https://b.hatena.ne.jp/${user}/`
</script>

<template>
  <div {...$$props} {...removeAttrs} class="{$$props.class || ''} BookmarksItemContent">
    <BookmarksItemAvatar {user} url="{userUrl}" class="BookmarksItemContent-avatar" />
    <BookmarksItemBody {user} {userUrl} {comment} {commentTexts} {tags} class="BookmarksItemContent-body" />
    {#if comment}
      <BookmarksItemCommentPermalink {user} {eid} class="BookmarksItemContent-permalink" />
    {/if}
    <BookmarksItemDate {eid} {user} {timestamp} class="BookmarksItemContent-date" />
  </div>
</template>

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
