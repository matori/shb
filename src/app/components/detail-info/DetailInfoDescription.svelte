<script>
  let { text, class: className = "", ...rest } = $props()
</script>

<p {...rest} class={[className, "DetailInfoDescription"]}>
  {#if text}{text}{:else}詳細データはありません。{/if}
</p>

<style lang="scss" global>
  .DetailInfoDescription {
    @include text(-1);
    margin: 0;
    overflow-wrap: break-word;
  }
</style>
