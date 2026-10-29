<script>
  let { url, ref = $bindable(), class: className = "", children, ...rest } = $props()
</script>

<a {...rest} href={url} target="_blank" rel="noreferrer noopeener nofollow" class={[className, "Link"]} bind:this={ref}>
  {@render children?.()}
</a>

<style>
  :global {
    .Link {
      &:focus:not(:focus-visible) {
        outline: none;
      }
    }
  }
</style>
