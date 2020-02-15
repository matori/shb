<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import Link from "~/elements/Link"

  let url
  let user
  export { url, user }

  const removeAttrs = createNullValueObject(["url", "user"])

  $: avatarUrl = `https://cdn.profile-image.st-hatena.com/users/${user}/profile.png`
</script>

<template>
  <div {...$$props} {...removeAttrs} class="{$$props.class || ''} BookmarksItemAvatar">
    <Link {url} class="BookmarksItemAvatar-link">
      <span
        class="BookmarksItemAvatar-image"
        role="img"
        aria-label="ID:{user}のプロフィール画像"
        style="content: url({avatarUrl})"
      ></span>
    </Link>
  </div>
</template>

<style lang="scss" global>
  .BookmarksItemAvatar {
    display: block;
    padding-top: rem($config-line-gap / 2);
    padding-bottom: rem($config-line-gap / 2);
    width: 32px;
    height: 32px;
  }

  .BookmarksItemAvatar-link {
    display: block;
    width: 100%;
    height: 100%;
  }

  .BookmarksItemAvatar-image {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
