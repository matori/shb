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

<style lang="scss" global>
  .DetailInfoToggleSwitch {
    @include text(-2);
    @include spread-clickable-area(0);
    display: block;
    align-items: center;
    position: relative;
    padding: get-lines(0.5) (get-lines(0.25) + $line-edge);
    width: 100%;
    height: 100%;
    white-space: nowrap;
    text-align: left;

    &:hover {
    }
  }

  .DetailInfoToggleSwitch-icon {
    @include icon-size(-2);
    display: inline-block;
    margin-top: -$line-edge;
    vertical-align: middle;

    &._show {
      display: inline-block;
    }

    &._hide {
      display: none;
    }
  }
</style>
