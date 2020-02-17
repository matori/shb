<script>
  import { createEventDispatcher } from "svelte"
  import KEY_NAMES from "~/constants/keyNames"
  import createNullValueObject from "~/utils/createNullValueObject"
  import Button from "~/elements/Button.svelte"
  import Icon from "~/elements/Icon.svelte"

  let closeButton = null
  let show = false
  export { closeButton, show }

  const removeAttrs = createNullValueObject(["closeButton", "show"])

  const dispatch = createEventDispatcher()

  function onKeydownModal(event) {
    if (event.key === KEY_NAMES.escape) {
      event.stopPropagation()
      dispatch("modal:close")
    }
  }

  function dispatchModalClose() {
    dispatch("modal:close")
  }

  function onKeydownCloseButton(event) {
    dispatch("closebutton:keydown", event)
  }
</script>

<template>
  <div
    {...$$props}
    {...removeAttrs}
    class="{$$props.class || ''} Modal"
    role="dialog"
    aria-hidden="{!show}"
    on:keydown="{onKeydownModal}"
  >
    <div class="Modal-backdrop" on:click="{dispatchModalClose}"></div>
    <Button
      class="Modal-close"
      title="ESCキー、画像の背景をクリックでも閉じられます"
      bind:ref="{closeButton}"
      on:click="{dispatchModalClose}"
      on:keydown="{onKeydownCloseButton}"
    >
      <Icon name="close" class="Modal-icon" />
      閉じる
    </Button>
    <div class="Modal-inner">
      <div class="Modal-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" global>
  .Modal {
    display: grid;
    grid-template-columns: get-lines(3) fit-content(calc(var(--content-max-width) - #{get-lines(2)})) get-lines(3);
    grid-template-rows: get-lines(3) 1fr get-lines(3);
    justify-content: center;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    visibility: hidden;

    &[aria-hidden="false"] {
      visibility: visible;
    }
  }

  .Modal-backdrop {
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.85);
  }

  .Modal-close {
    @include text(0);
    @include spread-clickable-area();
    display: flex;
    position: absolute;
    top: get-lines(0.5);
    right: get-lines(0.5);
    color: white;
  }

  .Modal-icon {
    @include icon-size(0);
  }

  .Modal-inner {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    min-height: 0;
    display: grid;
    grid-template-rows: fit-content(100%);
    align-content: center;
  }

  .Modal-content {
    overflow: auto;
  }
</style>
