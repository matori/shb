<script>
  import Link from "~/elements/Link"

  // カテゴリーが判別できなかった場合、slug は false になる
  let { slug, label, class: className = "", ...rest } = $props()

  const url = $derived(`https://b.hatena.ne.jp/hotentry/${slug}`)
</script>

<div {...rest} class={[className, "DetailInfoCategory"]}>
  {#if slug}
    <Link {url} class="DetailInfoCategory-link">{label}</Link>
  {:else}
    <span class="DetailInfoCategory-link">{label}</span>
  {/if}
</div>

<style>
  :global {
    .DetailInfoCategory {
      display: flex;
    }

    .DetailInfoCategory-link {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: block;
      border-radius: var(--radius-pill);
      padding: 0.05em 0.8em;
      background-color: var(--color-category-bg);
      color: var(--color-category);
      font-weight: var(--fw-medium);
      text-decoration: none;
      white-space: nowrap;

      /* リンクでない（カテゴリーが判別できなかった）ときは下線を出さない */
      &:is(a):hover {
        color: var(--color-category);
        text-decoration: underline;
      }
    }
  }
</style>
