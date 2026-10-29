<script>
  import Link from "~/elements/Link"
  import Icon from "~/elements/Icon"

  let { url, class: className = "", ...rest } = $props()

  const searchUrl = $derived(`https://x.com/search?q=${encodeURIComponent(url)}`)
</script>

<div {...rest} class={[className, "DetailInfoSearchX"]}>
  <Link url={searchUrl} class="DetailInfoSearchX-link">
    <Icon name="x" class="DetailInfoSearchX-icon" />
    <span class="DetailInfoSearchX-label">XでURL検索</span>
  </Link>
</div>

<style>
  :global {
    .DetailInfoSearchX {
    }

    .DetailInfoSearchX-link {
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

    .DetailInfoSearchX-icon {
      width: calc(var(--fs-s) * var(--lh-s));
      height: calc(var(--fs-s) * var(--lh-s));
      margin-right: 0.5em;
      color: var(--color-text-base);
    }

    .DetailInfoSearchX-label {
    }
  }
</style>
