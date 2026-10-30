<script>
  import Button from "~/elements/Button.svelte"
  import Icon from "~/elements/Icon.svelte"

  // open を true にするとモーダルダイアログとして開く
  // 閉じるボタン・ESCキー・背景のクリックで閉じると、open は false に戻る
  // フォーカスの閉じ込めと、閉じたあとに開く前の要素へフォーカスを戻すのは <dialog> にまかせる
  let { open = $bindable(false), label, class: className = "", children, ...rest } = $props()

  let dialog
  let pointerDownOnBackground = false

  $effect(() => {
    if (open && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  })

  function isBackground(target) {
    return target === dialog || target.classList.contains("Dialog-inner")
  }

  // 中身の上でボタンを押して背景で離した場合（テキストの選択など）に閉じないよう、押したときと離したときの両方を見る
  function onPointerDown(event) {
    pointerDownOnBackground = isBackground(event.target)
  }

  function onClick(event) {
    if (pointerDownOnBackground && isBackground(event.target)) {
      dialog.close()
    }
    pointerDownOnBackground = false
  }
</script>

<!-- 背景のクリックはマウス向けの補助。キーボードではESCキーか閉じるボタンで閉じられる -->
<dialog
  {...rest}
  class={[className, "Dialog"]}
  aria-label={label}
  bind:this={dialog}
  onpointerdown={onPointerDown}
  onclick={onClick}
  onclose={() => (open = false)}
>
  <Button class="Dialog-close" title="ESCキーや背景のクリックでも閉じられます" onclick={() => dialog.close()}>
    <Icon name="close" class="Dialog-icon" />
    閉じる
  </Button>
  <div class="Dialog-inner">
    <div class="Dialog-content">
      {@render children?.()}
    </div>
  </div>
</dialog>

<style>
  :global {
    /* ダイアログを開いている間は、後ろのページをスクロールさせない */
    :root:has(.Dialog[open]) {
      overflow: hidden;
    }

    /* 画面全体を覆い、その中央に中身を置く。中身のまわりの空いたところが背景になる */
    .Dialog {
      box-sizing: border-box;
      margin: 0;
      border: 0;
      padding: 0;
      width: 100%;
      max-width: none;
      height: 100%;
      max-height: none;
      background-color: transparent;
      color: var(--color-text);
      overscroll-behavior: contain;

      &[open] {
        display: grid;
        grid-template-columns: calc(var(--line) * 3) fit-content(calc(var(--content-max-width) - var(--line) * 2)) calc(
            var(--line) * 3
          );
        grid-template-rows: calc(var(--line) * 3) 1fr calc(var(--line) * 3);
        justify-content: center;
      }

      &::backdrop {
        background-color: var(--color-backdrop);
      }
    }

    .Dialog-close {
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

    .Dialog-icon {
      width: calc(var(--fs-s) * var(--lh-s));
      height: calc(var(--fs-s) * var(--lh-s));
    }

    .Dialog-inner {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
      display: grid;
      grid-template-rows: fit-content(100%);
      align-content: center;
      min-height: 0;
    }

    .Dialog-content {
      /* 読み上げ用に隠した文字（position: absolute）を、ページではなくこのスクロールの中に置く。ないとページに縦スクロールバーが出る */
      position: relative;
      overflow: auto;
    }
  }
</style>
