<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import BookmarksItemUser from "~/components/bookmarks/BookmarksItemUser"
  import BookmarksItemComment from "~/components/bookmarks/BookmarksItemComment"
  import BookmarksItemTags from "~/components/bookmarks/BookmarksItemTags"

  let user
  let userUrl
  let comment
  let commentTexts
  let tags
  export { user, userUrl, comment, commentTexts, tags }

  const removeAttrs = createNullValueObject(["user", "userUrl", "comment", "commentTexts", "tags"])
</script>

<template>
  <div {...$$props} {...removeAttrs} class="{$$props.class || ''} BookmarksItemBody">
    <BookmarksItemUser {user} url="{userUrl}" class="BookmarksItemBody-user" />
    {#if comment}
      <BookmarksItemComment {commentTexts} class="BookmarksItemBody-comment" />
    {/if}
    {#if tags.length}
      <BookmarksItemTags {user} {tags} class="BookmarksItemBody-tags" />
    {/if}
  </div>
</template>

<style lang="scss" global>
  .BookmarksItemBody {
    @include text(-1);
    display: grid;
    grid-template-rows: auto;
  }

  .BookmarksItemBody-user {
  }

  .BookmarksItemBody-comment {
    min-width: 0;
    word-break: break-all;
  }

  .BookmarksItemBody-tags {
  }
</style>
