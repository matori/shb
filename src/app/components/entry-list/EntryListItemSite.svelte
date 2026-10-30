<script>
  import Link from "~/elements/Link.svelte"

  let { url, label, favicon, class: className = "", ...rest } = $props()
</script>

<span {...rest} class={[className, "EntryListItemSite"]}>
  <Link {url} class="EntryListItemSite-link">
    <!-- ファビコンが取れなかった場合も、ラベルの位置をそろえるために場所は空けておく -->
    <span class="EntryListItemSite-favicon" aria-hidden="true" style={favicon ? `content: url(${favicon})` : null}
    ></span>
    <span class="EntryListItemSite-label">{label}</span>
  </Link>
</span>

<style>
  :global {
    .EntryListItemSite-link {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: inline-flex;
      align-items: center;
      gap: 0.3em;
      max-width: 100%;
      color: var(--color-text-muted);
      vertical-align: bottom;
      text-decoration: none;

      &:hover {
        color: var(--color-text-sub);
        text-decoration: underline;
      }
    }

    .EntryListItemSite-favicon {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      object-fit: contain;
    }

    .EntryListItemSite-label {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
