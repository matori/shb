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

<style lang="scss" global>
  .DetailInfoSearchTwitter {
  }

  .DetailInfoSearchTwitter-link {
    @include text(-1);
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
    @include icon-size(-1);
    margin-right: 0.5em;
    color: #1da1f2;
  }

  .DetailInfoSearchTwitter-label {
  }
</style>
