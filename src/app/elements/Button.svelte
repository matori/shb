<script>
  let { ref = $bindable(), class: className = "", children, ...rest } = $props()
</script>

<button type="button" {...rest} class={[className, "Button"]} bind:this={ref}>
  {@render children?.()}
</button>

<style>
  :global {
    /* 各コンポーネントのボタンのスタイルが常に優先されるよう、詳細度を0にしておく */
    :where(.Button) {
      &:focus:not(:focus-visible) {
        outline: none;
      }
      border-width: 0;
      padding: 0;
      background-color: transparent;
      background-image: none;
      color: inherit;
      font: inherit;
      cursor: pointer;

      &::-moz-focus-inner {
        border-width: 0;
        padding: 0;
      }

      &:disabled {
        cursor: not-allowed;
      }
    }
  }
</style>
