<script>
  import Link from "~/elements/Link"

  let { url, count, class: className = "", ...rest } = $props()

  const countSuffix = $derived(count > 1 ? "users" : "user")
</script>

<div {...rest} class={[className, "DetailInfoBookmarkCount"]}>
  <Link {url} class="DetailInfoBookmarkCount-total">
    <span class="DetailInfoBookmarkCount-totalCount">{count}</span>
    <span class="DetailInfoBookmarkCount-totalSuffix">{countSuffix}</span>
  </Link>
</div>

<style>
  :global {
    .DetailInfoBookmarkCount-total {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      display: inline-flex;
      align-items: baseline;
      gap: 0.2em;
      border-radius: var(--radius-pill);
      padding: 0.05em 0.8em;
      background-color: var(--color-count-bg);
      color: var(--color-count);
      font-weight: var(--fw-bold);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      text-decoration: none;

      &:hover {
        background-color: var(--color-count);
        color: var(--color-on-accent);
      }
    }

    .DetailInfoBookmarkCount-totalSuffix {
      font-size: var(--fs-xs);
    }
  }
</style>
