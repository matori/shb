<script>
  import { detailInfoExpanded } from "~/store/ui"
  import DetailInfoToggleSwitch from "~/components/detail-info/DetailInfoToggleSwitch"
  import DetailInfoHeader from "~/components/detail-info/DetailInfoHeader.svelte"
  import DetailInfoBody from "~/components/detail-info/DetailInfoBody.svelte"

  let { detailContent, itemData, class: className = "", ...rest } = $props()
</script>

<div {...rest} class={[className, "DetailInfo"]} aria-expanded={$detailInfoExpanded}>
  <div class="DetailInfo-tool">
    <DetailInfoToggleSwitch
      open={$detailInfoExpanded}
      class="DetailInfo-switch"
      onclick={() => detailInfoExpanded.set(!$detailInfoExpanded)}
    />
  </div>
  <div class="DetailInfo-inner">
    <DetailInfoHeader {detailContent} {itemData} detailInfoExpanded={$detailInfoExpanded} class="DetailInfo-header" />
    <DetailInfoBody {detailContent} {itemData} detailInfoExpanded={$detailInfoExpanded} class="DetailInfo-body" />
  </div>
</div>

<style lang="scss" global>
  .DetailInfo {
  }

  .DetailInfo-tool {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--color-border-base);
  }

  .DetailInfo-inner {
    display: grid;
    grid-auto-rows: auto;
    row-gap: get-lines(0.5);
    padding: get-lines(0.5) (get-lines(0.25) + $line-edge);
  }

  .DetailInfo-header {
  }

  .DetailInfo-body {
  }
</style>
