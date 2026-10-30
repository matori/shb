<script>
  import Link from "~/elements/Link.svelte"

  // エントリーのサイトのファビコンと名前。はてなブックマークの、そのサイトのエントリー一覧へのリンク
  let { url, label, favicon, class: className = "", ...rest } = $props()
</script>

<Link {...rest} {url} class={[className, "SiteLink"]}>
  <!-- ファビコンがないときも、名前の位置をそろえるために場所は空けておく -->
  {#if favicon}
    <img src={favicon} alt="" loading="lazy" class="SiteLink-favicon" />
  {:else}
    <span class="SiteLink-favicon"></span>
  {/if}
  <span class="SiteLink-label">{label}</span>
</Link>

<style>
  :global {
    .SiteLink {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
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

    .SiteLink-favicon {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      object-fit: contain;
    }

    .SiteLink-label {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
