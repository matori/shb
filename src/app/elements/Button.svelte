<script>
  import createNullValueObject from "~/utils/createNullValueObject"

  let ref = null
  export { ref }

  const removeAttrs = createNullValueObject(["ref"])
</script>

<template>
  <button
    type="button"
    {...$$props}
    {...removeAttrs}
    class="{$$props.class || ''} Button"
    bind:this="{ref}"
    on:click
    on:keydown
  >
    <slot />
  </button>
</template>

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
