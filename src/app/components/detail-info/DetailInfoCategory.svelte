<script>
  import Link from "~/elements/Link"

  let { slug, label, class: className = "", ...rest } = $props()

  const url = $derived(`https://b.hatena.ne.jp/hotentry/${slug}`)
</script>

<div {...rest} class={[className, "DetailInfoCategory"]}>
  <Link {url} class="DetailInfoCategory-link">{label}</Link>
</div>

<style>
  :global {
    .DetailInfoCategory {
      display: flex;
      align-items: flex-end;
    }

    .DetailInfoCategory-link {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: block;
      border-radius: 2px;
      padding-right: 0.5em;
      padding-left: 0.5em;
      background-color: var(--color-bg-orange);
      color: white;
      text-decoration: none;
      white-space: nowrap;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
