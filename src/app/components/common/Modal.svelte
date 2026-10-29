<script>
  import KEY_NAMES from "~/constants/keyNames"
  import Button from "~/elements/Button.svelte"
  import Icon from "~/elements/Icon.svelte"

  let {
    closeButton = $bindable(),
    show = false,
    onclose,
    onclosebuttonkeydown,
    class: className = "",
    children,
    ...rest
  } = $props()

  function onKeydownModal(event) {
    if (event.key === KEY_NAMES.escape) {
      event.stopPropagation()
      onclose?.()
    }
  }
</script>

<div {...rest} class={[className, "Modal"]} role="dialog" aria-hidden={!show} onkeydown={onKeydownModal}>
  <!-- 背景クリックはマウス向けの補助。キーボードではESCキーで閉じられる -->
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div class="Modal-backdrop" onclick={() => onclose?.()}></div>
  <Button
    class="Modal-close"
    title="ESCキー、画像の背景をクリックでも閉じられます"
    bind:ref={closeButton}
    onclick={() => onclose?.()}
    onkeydown={onclosebuttonkeydown}
  >
    <Icon name="close" class="Modal-icon" />
    閉じる
  </Button>
  <div class="Modal-inner">
    <div class="Modal-content">
      {@render children?.()}
    </div>
  </div>
</div>

<style>
  :global {
    .Modal {
      display: grid;
      grid-template-columns: calc(var(--line) * 3) fit-content(calc(var(--content-max-width) - var(--line) * 2)) calc(
          var(--line) * 3
        );
      grid-template-rows: calc(var(--line) * 3) 1fr calc(var(--line) * 3);
      justify-content: center;
      position: fixed;
      z-index: 2;
      inset: 0;
      visibility: hidden;

      &[aria-hidden="false"] {
        visibility: visible;
      }
    }

    .Modal-backdrop {
      position: absolute;
      z-index: -1;
      inset: 0;
      background-color: var(--color-backdrop);
    }

    .Modal-close {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      display: flex;
      align-items: center;
      gap: 0.25em;
      position: absolute;
      top: calc(var(--line) * 0.75);
      right: calc(var(--line) * 0.75);
      border-radius: var(--radius-pill);
      padding: 0.3em 1em;
      background-color: var(--color-surface);
      color: var(--color-text);

      &:hover {
        background-color: var(--color-surface-sub);
      }
    }

    .Modal-icon {
      width: calc(var(--fs-s) * var(--lh-s));
      height: calc(var(--fs-s) * var(--lh-s));
    }

    .Modal-inner {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
      display: grid;
      grid-template-rows: fit-content(100%);
      align-content: center;
      min-height: 0;
    }

    .Modal-content {
      overflow: auto;
    }
  }
</style>
