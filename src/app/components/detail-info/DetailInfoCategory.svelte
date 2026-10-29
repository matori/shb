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

      /* リンクでない（カテゴリーが判別できなかった）ときは下線を出さない */
      &:is(a):hover {
        text-decoration: underline;
      }
    }
  }
</style>
