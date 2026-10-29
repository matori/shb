<script>
  import Link from "~/elements/Link"

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
    .EntryListItemSite {
      padding-right: var(--line-edge);
    }

    .EntryListItemSite-link {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: inline-flex;
      align-items: center;
      max-width: 100%;
      color: var(--color-text-steel);
      vertical-align: bottom;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .EntryListItemSite-favicon {
      flex-grow: 0;
      flex-shrink: 0;
      margin-right: 0.25em;
      width: 16px;
      height: 16px;
      object-fit: contain;
    }

    .EntryListItemSite-label {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
