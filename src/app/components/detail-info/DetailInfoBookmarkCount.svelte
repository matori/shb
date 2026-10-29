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
    .DetailInfoBookmarkCount {
    }

    .DetailInfoBookmarkCount-total {
      font-size: var(--fs-xl);
      line-height: var(--lh-xl);
      position: relative;
      display: inline-flex;
      align-items: baseline;
      color: var(--color-text-red);
      text-decoration: none;

      &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        border-top-width: 1px;
        border-top-style: solid;
        content: "";
        transform: scaleY(1);
      }

      &:hover::after {
        transform: scaleY(3);
      }
    }

    .DetailInfoBookmarkCount-totalCount {
    }

    .DetailInfoBookmarkCount-totalSuffix {
      font-size: var(--fs-s);
      margin-left: 0.1em;
    }
  }
</style>
