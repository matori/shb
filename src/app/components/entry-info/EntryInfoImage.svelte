<script>
  import Button from "~/elements/Button.svelte"
  import Link from "~/elements/Link.svelte"
  import Icon from "~/elements/Icon.svelte"
  import Dialog from "~/components/common/Dialog.svelte"

  // エントリー情報の画像。押すとダイアログで拡大表示する
  let { image, class: className = "", ...rest } = $props()

  let imageLoadError = $state(false)
  let dialogOpen = $state(false)
</script>

<div {...rest} class={[className, "EntryInfoImage"]}>
  <Button
    class={["EntryInfoImage-button", { _loadError: imageLoadError }]}
    aria-haspopup="dialog"
    onclick={() => (dialogOpen = true)}
  >
    {#if !imageLoadError}
      <img
        src={image}
        alt="エントリーの画像を拡大表示"
        class="EntryInfoImage-image"
        onerror={() => (imageLoadError = true)}
      />
    {:else}
      <span class="EntryInfoImage-error">
        <span class="EntryInfoImage-message">画像の読み込みに失敗しました</span>
        <Icon name="broken-image" class="EntryInfoImage-placeholder" />
      </span>
    {/if}
  </Button>
</div>
<Dialog label="エントリーの画像" bind:open={dialogOpen}>
  <Link url={image} class="EntryInfoImage-dialogLink">
    <img src={image} alt="画像を新しいタブで開く" class="EntryInfoImage-dialogImage" />
  </Link>
</Dialog>

<style>
  :global {
    .EntryInfoImage-button {
      display: block;
      max-width: 100%;
      text-align: left;
      cursor: zoom-in;

      &._loadError {
        color: var(--color-text-muted);
      }
    }

    .EntryInfoImage-image {
      display: block;
      border-radius: var(--radius-control);
      max-width: 100%;
      height: auto;
    }

    .EntryInfoImage-error {
      display: block;
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

    .EntryInfoImage-placeholder {
      position: absolute;
      z-index: 1;
      inset: 0;
      margin: auto;
      color: var(--color-text);
      opacity: 0.2;
    }

    .EntryInfoImage-dialogLink {
      min-width: 0;
      min-height: 0;
    }

    .EntryInfoImage-dialogImage {
      display: block;
      border-radius: var(--radius-control);
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
</style>
