<script>
  import Link from "~/elements/Link.svelte"
  import Icon from "~/elements/Icon.svelte"

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
    .DetailInfoSearchX-link {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: inline-flex;
      align-items: center;
      gap: 0.4em;
      color: var(--color-text-sub);
      text-decoration: none;

      &:hover {
        color: var(--color-text);
        text-decoration: underline;
      }
    }

    .DetailInfoSearchX-icon {
      width: 1em;
      height: 1em;
      color: var(--color-text);
    }
  }
</style>
