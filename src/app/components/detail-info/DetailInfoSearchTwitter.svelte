<script>
  import Link from "~/elements/Link"
  import Icon from "~/elements/Icon"

  let { url, class: className = "", ...rest } = $props()

  const twitterUrl = $derived(`https://twitter.com/search?q=${encodeURIComponent(url)}`)
</script>

<div {...rest} class={[className, "DetailInfoSearchTwitter"]}>
  <Link url={twitterUrl} class="DetailInfoSearchTwitter-link">
    <Icon name="twitter" class="DetailInfoSearchTwitter-icon" />
    <span class="DetailInfoSearchTwitter-label">TwitterでURL検索</span>
  </Link>
</div>

<style>
  :global {
    .DetailInfoSearchTwitter {
    }

    .DetailInfoSearchTwitter-link {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      display: inline-flex;
      align-items: center;
      color: var(--color-text-gray);
      text-decoration: none;
      vertical-align: bottom;

      &:hover {
        text-decoration: underline;
      }
    }

    .DetailInfoSearchTwitter-icon {
      width: calc(var(--fs-s) * var(--lh-s));
      height: calc(var(--fs-s) * var(--lh-s));
      margin-right: 0.5em;
      color: #1da1f2;
    }

    .DetailInfoSearchTwitter-label {
    }
  }
</style>
