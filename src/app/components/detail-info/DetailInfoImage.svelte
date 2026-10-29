<script>
  import KEY_NAMES from "~/constants/keyNames"
  import Link from "~/elements/Link"
  import Icon from "~/elements/Icon"
  import Modal from "~/components/common/Modal.svelte"

  let { image, class: className = "", ...rest } = $props()

  let imageLoadError = $state(false)
  let modalShow = $state(false)
  let modalTrigger = $state()
  let closeButton = $state()
  let lastFocusable = $state()

  function showModal(event) {
    event.preventDefault()
    modalShow = true
    requestAnimationFrame(() => {
      closeButton.focus()
    })
  }

  function closeModal() {
    modalShow = false
    modalTrigger.focus()
  }

  function onKeydownCloseButton(event) {
    if (event.key === KEY_NAMES.tab && event.shiftKey) {
      event.preventDefault()
      event.stopPropagation()
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

<div {...rest} class={[className, "DetailInfoImage"]}>
  <Link
    url={image}
    class={["DetailInfoImage-link", { _loadError: imageLoadError }]}
    title="画像を拡大表示"
    bind:ref={modalTrigger}
    onclick={showModal}
  >
    {#if !imageLoadError}
      <img src={image} alt="" class="DetailInfoImage-image" onerror={() => (imageLoadError = true)} />
    {:else}
      <div class="DetailInfoImage-error">
        <span class="DetailInfoImage-message">画像の読み込みに失敗しました</span>
        <Icon name="broken-image" class="DetailInfoImage-placeholder" aria-hidden="true" />
      </div>
    {/if}
  </Link>
</div>
<Modal show={modalShow} bind:closeButton onclose={closeModal} onclosebuttonkeydown={onKeydownCloseButton}>
  <Link
    url={image}
    class="DetailInfoImage-modalLink"
    title="画像を直接開く"
    bind:ref={lastFocusable}
    onkeydown={onKeydownLastFocusable}
  >
    <img src={image} alt="" class="DetailInfoImage-modalImage" />
  </Link>
</Modal>

<style>
  :global {
    .DetailInfoImage-link {
      display: block;
      cursor: zoom-in;

      &._loadError {
        color: var(--color-text-muted);
      }
    }

    .DetailInfoImage-image {
      display: block;
      border-radius: var(--radius-control);
      max-width: 100%;
      height: auto;
    }

    .DetailInfoImage-error {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      position: relative;
      z-index: 0;
      box-sizing: border-box;
      border-radius: var(--radius-control);
      padding: calc(var(--line) * 0.25);
      width: 160px;
      height: 120px;
      background-color: var(--color-surface-sub);
    }

    .DetailInfoImage-placeholder {
      position: absolute;
      z-index: 1;
      inset: 0;
      margin: auto;
      color: var(--color-text);
      opacity: 0.2;
    }

    .DetailInfoImage-modalLink {
      min-width: 0;
      min-height: 0;
    }

    .DetailInfoImage-modalImage {
      display: block;
      border-radius: var(--radius-control);
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
</style>
