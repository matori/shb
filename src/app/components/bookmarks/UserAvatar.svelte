<script>
  import Link from "~/elements/Link.svelte"

  // ユーザーのプロフィール画像。ユーザーのページへのリンク
  // すぐ隣に同じページへのユーザー名のリンクがあるので、読み上げとキーボード操作からは外す
  let { user, class: className = "", ...rest } = $props()
</script>

<Link {...rest} url="https://b.hatena.ne.jp/{user}/" class={[className, "UserAvatar"]} tabindex="-1" aria-hidden="true">
  <img
    src="https://cdn.profile-image.st-hatena.com/users/{user}/profile.png"
    alt=""
    loading="lazy"
    class="UserAvatar-image"
  />
</Link>

<style>
  :global {
    .UserAvatar {
      display: block;
      flex-shrink: 0;
      width: 32px;
      height: 32px;
    }

    .UserAvatar-image {
      display: block;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      background-color: var(--color-avatar-bg);
    }
  }
</style>
