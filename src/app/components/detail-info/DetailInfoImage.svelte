<script>
  import Button from "~/elements/Button"
  import Link from "~/elements/Link"
  import Icon from "~/elements/Icon"
  import Dialog from "~/components/common/Dialog.svelte"

  let { image, class: className = "", ...rest } = $props()

  let imageLoadError = $state(false)
  let dialogOpen = $state(false)
</script>

<div {...rest} class={[className, "DetailInfoImage"]}>
  <Button
    class={["DetailInfoImage-button", { _loadError: imageLoadError }]}
    aria-haspopup="dialog"
    onclick={() => (dialogOpen = true)}
  >
    {#if !imageLoadError}
      <img
        src={image}
        alt="エントリーの画像を拡大表示"
        class="DetailInfoImage-image"
        onerror={() => (imageLoadError = true)}
      />
    {:else}
      <span class="DetailInfoImage-error">
        <span class="DetailInfoImage-message">画像の読み込みに失敗しました</span>
        <Icon name="broken-image" class="DetailInfoImage-placeholder" aria-hidden="true" />
      </span>
    {/if}
  </Button>
</div>
<Dialog label="エントリーの画像" bind:open={dialogOpen}>
  <Link url={image} class="DetailInfoImage-dialogLink">
    <img src={image} alt="画像を新しいタブで開く" class="DetailInfoImage-dialogImage" />
  </Link>
</Dialog>

<style>
  :global {
    .DetailInfoImage-button {
      display: block;
      max-width: 100%;
      text-align: left;
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

    .DetailInfoImage-placeholder {
      position: absolute;
      z-index: 1;
      inset: 0;
      margin: auto;
      color: var(--color-text);
      opacity: 0.2;
    }

    .DetailInfoImage-dialogLink {
      min-width: 0;
      min-height: 0;
    }

    .DetailInfoImage-dialogImage {
      display: block;
      border-radius: var(--radius-control);
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
</style>
