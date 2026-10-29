<script>
  let { text, class: className = "", ...rest } = $props()
</script>

<p {...rest} class={[className, "DetailInfoDescription"]}>
  {#if text}{text}{:else}詳細データはありません。{/if}
</p>

<style>
  :global {
    .DetailInfoDescription {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      margin: 0;
      color: var(--color-text-sub);
      overflow-wrap: break-word;
    }
  }
</style>
