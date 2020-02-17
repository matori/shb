<script>
  import KEY_NAMES from "~/constants/keyNames"
  import createNullValueObject from "~/utils/createNullValueObject"
  import Link from "~/elements/Link"
  import Icon from "~/elements/Icon"
  import Modal from "~/components/common/Modal.svelte"

  let image
  export { image }

  const removeAttrs = createNullValueObject(["image"])

  let imageLoadError = false
  let modalShow = false
  let modalTrigger
  let closeButton
  let lastFocusable

  function onErrorLoadImage() {
    imageLoadError = true
  }

  function showModal(event) {
    event.preventDefault()
    modalShow = true
    requestAnimationFrame(() => {
      closeButton.focus()
    })
  }

  function hideModal(event) {
    event.preventDefault()
    closeModal()
  }

  function closeModal() {
    modalShow = false
    modalTrigger.focus()
  }

  function onKeydownModal(event) {
    if (event.key === KEY_NAMES.escape) {
      event.stopPropagation()
      closeModal()
    }
  }

  function onKeydownCloseButton(event) {
    const originalEvent = event.detail
    if (originalEvent.key === KEY_NAMES.tab && originalEvent.shiftKey) {
      originalEvent.preventDefault()
      originalEvent.stopPropagation()
      lastFocusable.focus()
    }
  }

  function onKeydownLastFocusable(event) {
    if (event.key === KEY_NAMES.tab && !event.shiftKey) {
      event.preventDefault()
      event.stopPropagation()
      closeButton.focus()
    }
  }
</script>

<template>
  <div {...$$props} {...removeAttrs} class="{$$props.class || ''} DetailInfoImage">
    <Link
      url="{image}"
      class="DetailInfoImage-link {imageLoadError ? '_loadError' : ''}"
      title="画像を拡大表示"
      bind:ref="{modalTrigger}"
      on:click="{showModal}"
    >
      {#if !imageLoadError}
        <img src="{image}" alt="" class="DetailInfoImage-image" on:error="{onErrorLoadImage}" />
      {:else}
        <div class="DetailInfoImage-error">
          <span class="DetailInfoImage-message">画像の読み込みに失敗しました</span>
          <Icon name="broken-image" class="DetailInfoImage-placeholder" aria-hidden="true" />
        </div>
      {/if}
    </Link>
  </div>
  <Modal
    show="{modalShow}"
    {lastFocusable}
    bind:closeButton
    on:modal:close="{hideModal}"
    on:closebutton:keydown="{onKeydownCloseButton}"
  >
    <Link
      url="{image}"
      class="DetailInfoImage-modalLink"
      title="画像を直接開く"
      bind:ref="{lastFocusable}"
      on:keydown="{onKeydownLastFocusable}"
    >
      <img src="{image}" alt="" class="DetailInfoImage-modalImage" />
    </Link>
  </Modal>
</template>

<style lang="scss" global>
  .DetailInfoImage {
    padding-top: $line-edge;
    padding-bottom: $line-edge;
  }

  .DetailInfoImage-link {
    display: block;
    text-decoration: none;
    cursor: zoom-in;

    &._loadError {
      color: #757575;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  .DetailInfoImage-image {
    display: block;
    max-width: 100%;
    height: auto;
  }

  .DetailInfoImage-error {
    @include text(-1);
    position: relative;
    z-index: 0;
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: var(--color-border-base);
    padding: get-lines(0.25);
    width: 160px;
    height: 120px;
    background-color: var(--color-bg-base);
  }

  .DetailInfoImage-message {
  }

  .DetailInfoImage-placeholder {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    color: var(--color-text-base);
    opacity: 0.2;
  }

  .DetailInfoImage-modal {
    display: grid;
    grid-template-columns: 1fr fit-content(100%) 1fr;
    grid-template-rows: 1fr fit-content(100%) 1fr;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    visibility: hidden;

    &._show {
      visibility: visible;
    }
  }

  .DetailInfoImage-modalBackdrop {
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.85);
  }

  .DetailInfoImage-modalClose {
    @include text(0);
    @include spread-clickable-area();
    display: flex;
    position: absolute;
    top: get-lines(0.5);
    right: get-lines(0.5);
    color: white;
  }

  .DetailInfoImage-modalIcon {
    @include icon-size(0);
  }

  .DetailInfoImage-modalLink {
    min-width: 0;
    min-height: 0;
  }

  .DetailInfoImage-modalImage {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>
