<script>
  import Link from "~/elements/Link.svelte"

  // 「はてなブックマークで見る」などの、はてなブックマークの該当ページへのリンク。ボタンのような見た目にする
  let { url, class: className = "", children, ...rest } = $props()
</script>

<Link {...rest} {url} class={[className, "HatenaBookmarkLink"]}>
  {@render children?.()}
</Link>

<style>
  :global {
    .HatenaBookmarkLink {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      display: inline-block;
      border: 1px solid var(--color-line-strong);
      border-radius: var(--radius-pill);
      padding: 0.4em 1.2em;
      background-color: var(--color-surface);
      color: var(--color-accent);
      text-decoration: none;

      &:hover {
        background-color: var(--color-surface-sub);
        color: var(--color-accent-hover);
      }
    }
  }
</style>
