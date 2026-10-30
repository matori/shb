<script>
  import Link from "~/elements/Link.svelte"

  let { url, label, favicon, class: className = "", ...rest } = $props()
</script>

<span {...rest} class={[className, "DetailInfoSite"]}>
  <Link {url} class="DetailInfoSite-link">
    {#if favicon}
      <img src={favicon} class="DetailInfoSite-favicon" alt="" />
    {:else}
      <span class="DetailInfoSite-favicon"></span>
    {/if}
    <span class="DetailInfoSite-label">{label}</span>
  </Link>
</span>

<style>
  :global {
    .DetailInfoSite {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: flex;
      min-width: 0;
    }

    .DetailInfoSite-link {
      display: inline-flex;
      align-items: center;
      gap: 0.3em;
      max-width: 100%;
      color: var(--color-text-muted);
      text-decoration: none;

      &:hover {
        color: var(--color-text-sub);
        text-decoration: underline;
      }
    }

    .DetailInfoSite-favicon {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      object-fit: contain;
    }

    .DetailInfoSite-label {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
