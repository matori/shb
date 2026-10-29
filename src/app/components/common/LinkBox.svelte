<script>
  import Link from "~/elements/Link"

  let { url, class: className = "", children, ...rest } = $props()
</script>

<Link {...rest} {url} class={[className, "LinkBox"]}>
  {@render children?.()}
</Link>

<style>
  :global {
    .LinkBox {
      font-size: var(--fs-s);
      display: inline-block;
      border-radius: 2px;
      padding: calc(var(--line) * 0.5);
      overflow: hidden;
      background-color: var(--color-bg-blue);
      color: white;
      line-height: 1;
      text-decoration: none;
      vertical-align: bottom;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
