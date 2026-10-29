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
      &::before {
        position: absolute;
        inset: 0;
        content: "";
        box-shadow: 0 0 2px 1px var(--color-text-blue);
        opacity: 0;
      }

      &:hover::before {
        opacity: 1;
      }
      display: block;
      align-items: center;
      position: relative;
      padding: calc(var(--line) * 0.5) calc(var(--line) * 0.25 + var(--line-edge));
      width: 100%;
      height: 100%;
      white-space: nowrap;
      text-align: left;

      &:hover {
      }
    }

    .DetailInfoToggleSwitch-icon {
      width: calc(var(--fs-xs) * var(--lh-xs));
      height: calc(var(--fs-xs) * var(--lh-xs));
      display: inline-block;
      margin-top: calc(var(--line-edge) * -1);
      vertical-align: middle;

      &._show {
        display: inline-block;
      }

      &._hide {
        display: none;
      }
    }
  }
</style>
