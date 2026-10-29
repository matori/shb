<script>
  let { ordered = false, class: className = "", children, ...rest } = $props()
</script>

<svelte:element this={ordered ? "ol" : "ul"} {...rest} class={[className, "List"]}>
  {@render children?.()}
</svelte:element>

<style>
  :global {
    .List {
      margin: 0;
      padding-left: 0;
      list-style-type: none;
    }
  }
</style>
