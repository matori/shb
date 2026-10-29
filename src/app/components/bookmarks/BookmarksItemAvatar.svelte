<script>
  import Link from "~/elements/Link"

  let { url, user, class: className = "", ...rest } = $props()

  const avatarUrl = $derived(`https://cdn.profile-image.st-hatena.com/users/${user}/profile.png`)
</script>

<div {...rest} class={[className, "BookmarksItemAvatar"]}>
  <Link {url} class="BookmarksItemAvatar-link">
    <span
      class="BookmarksItemAvatar-image"
      role="img"
      aria-label="ID:{user}のプロフィール画像"
      style="content: url({avatarUrl})"
    ></span>
  </Link>
</div>

<style lang="scss" global>
  .BookmarksItemAvatar {
    display: block;
    padding-top: $line-edge;
    padding-bottom: $line-edge;
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
