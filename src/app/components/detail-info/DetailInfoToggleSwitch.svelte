<script>
  import Button from "~/elements/Button.svelte"
  import Icon from "~/elements/Icon.svelte"

  let { open, class: className = "", ...rest } = $props()
</script>

<Button {...rest} class={[className, "DetailInfoToggleSwitch"]} aria-pressed={open}>
  {#if open}エントリー情報を折りたたむ{:else}エントリー情報を展開する{/if}
  <Icon name="expand" class="DetailInfoToggleSwitch-icon {open ? '_hide' : '_show'}" />
  <Icon name="collapse" class="DetailInfoToggleSwitch-icon {open ? '_show' : '_hide'}" />
</Button>

<style>
  :global {
    .DetailInfoToggleSwitch {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: inline-flex;
      align-items: center;
      gap: 0.25em;
      border-radius: var(--radius-pill);
      padding: 0.2em 0.6em;
      color: var(--color-text-muted);
      white-space: nowrap;

      &:hover {
        background-color: var(--color-surface-sub);
        color: var(--color-text);
      }
    }

    .DetailInfoToggleSwitch-icon {
      width: calc(var(--fs-xs) * var(--lh-xs));
      height: calc(var(--fs-xs) * var(--lh-xs));

      &._hide {
        display: none;
      }
    }
  }
</style>
