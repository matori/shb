<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import Link from "~/elements/Link"

  let user
  let url
  export { user, url }

  const removeAttrs = createNullValueObject(["user", "url"])
</script>

<template>
  <div {...$$props} {...removeAttrs} class="{$$props.class || ''} BookmarksItemUser">
    <Link {url} class="BookmarksItemUser-link">{user}</Link>
  </div>
</template>

<style lang="scss" global>
  .BookmarksItemUser {
  }

  .BookmarksItemUser-link {
    color: var(--color-text-blue);
    font-weight: var(--fw-bold);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
