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
      font-size: var(--fs-m);
      line-height: var(--lh-m);
      &::before {
        position: absolute;
        inset: calc(var(--line-edge) * -1);
        content: "";
        box-shadow: 0 0 2px 1px var(--color-text-blue);
        opacity: 0;
      }

      &:hover::before {
        opacity: 1;
      }
      display: flex;
      position: absolute;
      top: calc(var(--line) * 0.5);
      right: calc(var(--line) * 0.5);
      color: white;
    }

    .Modal-icon {
      width: var(--line);
      height: var(--line);
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
  }
</style>
