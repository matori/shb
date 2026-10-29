<script>
  let { ref = $bindable(), class: className = "", children, ...rest } = $props()
</script>

<button type="button" {...rest} class={[className, "Button"]} bind:this={ref}>
  {@render children?.()}
</button>

<style lang="scss" global>
  .Button {
    @include focus-clear-without-keyboard;
    border-width: 0;
    padding: 0;
    background-color: transparent;
    background-image: none;
    font-family: var(--ff-without-emojis);

    &::-moz-focus-inner {
      border-width: 0;
      padding: 0;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }
</style>
