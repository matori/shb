<script>
  import Link from "~/elements/Link"

  let { url, class: className = "", children, ...rest } = $props()
</script>

<Link {...rest} {url} class={[className, "LinkBox"]}>
  {@render children?.()}
</Link>

<style lang="scss" global>
  .LinkBox {
    @include text(-1, false);
    display: inline-block;
    border-radius: 2px;
    padding: get-lines(0.5);
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
</style>
