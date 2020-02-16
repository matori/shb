<script>
  import KEY_NAMES from "~/constants/keyNames"
  import createNullValueObject from "~/utils/createNullValueObject"
  import { imageModalShow } from "~/store/ui"
  import Link from "~/elements/Link"
  import Icon from "~/elements/Icon"
  import Button from "~/elements/Button"

  let image
  export { image }

  const removeAttrs = createNullValueObject(["image"])

  let imageLoadError = false
  let closeButton
  let modalTrigger
  let externalImage

  function onErrorLoadImage() {
    imageLoadError = true
  }

  function showModal(event) {
    event.preventDefault()
    imageModalShow.set(true)
    requestAnimationFrame(() => {
      closeButton.focus()
    })
  }

  function hideModal(event) {
    event.preventDefault()
    closeModal()
  }

  function closeModal() {
    imageModalShow.set(false)
    modalTrigger.focus()
  }

  function onKeydownModal(event) {
    if (event.key === KEY_NAMES.escape) {
      event.stopPropagation()
      closeModal()
    }
  }

  function onKeydownCloseButton(event) {
    if (event.key === KEY_NAMES.tab && event.shiftKey) {
      event.preventDefault()
      event.stopPropagation()
      externalImage.focus()
    }
  }

  function onKeydownExternalImage(event) {
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
  <div class="DetailInfoImage-modal {$imageModalShow ? '_show' : ''}" on:keydown="{onKeydownModal}">
    <div class="DetailInfoImage-modalBackdrop" on:click="{hideModal}"></div>
    <Button
      class="DetailInfoImage-modalClose"
      title="ESCキー、画像の背景をクリックでも閉じられます"
      bind:ref="{closeButton}"
      on:click="{hideModal}"
      on:keydown="{onKeydownCloseButton}"
    >
      <Icon name="close" class="DetailInfoImage-modalIcon" />
      閉じる
    </Button>
    <Link
      url="{image}"
      class="DetailInfoImage-modaLink"
      title="画像を直接開く"
      bind:ref="{externalImage}"
      on:keydown="{onKeydownExternalImage}"
    >
      <img src="{image}" alt="" class="DetailInfoImage-modalImage" />
    </Link>
  </div>
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

  .DetailInfoImage-modaLink {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    margin: get-lines(2);
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
