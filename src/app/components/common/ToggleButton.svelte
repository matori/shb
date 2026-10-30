<script>
  import Button from "~/elements/Button.svelte"
  import Icon from "~/elements/Icon.svelte"

  // オン・オフを切り替えるボタン（WAI-ARIA の switch）。チェックボックスのアイコンで状態を見せる
  let { checked = $bindable(false), class: className = "", children, ...rest } = $props()
</script>

<Button
  {...rest}
  class={[className, "ToggleButton"]}
  role="switch"
  aria-checked={checked}
  onclick={() => (checked = !checked)}
>
  <Icon name={checked ? "checkbox-checked" : "checkbox-outline"} class="ToggleButton-icon" />
  {@render children?.()}
</Button>

<style>
  :global {
    .ToggleButton {
      display: flex;
      align-items: center;
      gap: 0.3em;
      border-radius: var(--radius-pill);
      color: var(--color-text-sub);
      white-space: nowrap;

      &:hover {
        background-color: var(--color-surface-sub);
        color: var(--color-text);
      }
    }

    .ToggleButton-icon {
      flex-shrink: 0;
      width: calc(var(--fs-s) * var(--lh-s));
      height: calc(var(--fs-s) * var(--lh-s));
    }
  }
</style>
