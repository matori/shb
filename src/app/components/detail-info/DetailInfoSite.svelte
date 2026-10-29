<script>
  import Link from "~/elements/Link"

  let { url, label, favicon, class: className = "", ...rest } = $props()
</script>

<span {...rest} class={[className, "DetailInfoSite"]}>
  <Link {url} class="DetailInfoSite-link">
    <img src={favicon} class="DetailInfoSite-favicon" alt="" />
    <span class="DetailInfoSite-label">{label}</span>
  </Link>
</span>

<style>
  :global {
    .DetailInfoSite {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: flex;
      align-items: flex-end;
    }

    .DetailInfoSite-link {
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

    .DetailInfoSite-favicon {
      flex-grow: 0;
      flex-shrink: 0;
      margin-right: 0.25em;
      width: 16px;
      height: 16px;
      object-fit: contain;
    }

    .DetailInfoSite-label {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
