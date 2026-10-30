<script>
  import { viewState } from "~/store/viewState.svelte.js"
  import DetailInfoToggleSwitch from "~/components/detail-info/DetailInfoToggleSwitch.svelte"
  import DetailInfoHeader from "~/components/detail-info/DetailInfoHeader.svelte"
  import DetailInfoBody from "~/components/detail-info/DetailInfoBody.svelte"

  let { detailContent, itemData, class: className = "", ...rest } = $props()
</script>

<div {...rest} class={[className, "DetailInfo"]} aria-expanded={viewState.entryInfoExpanded}>
  <div class="DetailInfo-tool">
    <DetailInfoToggleSwitch
      open={viewState.entryInfoExpanded}
      class="DetailInfo-switch"
      onclick={() => (viewState.entryInfoExpanded = !viewState.entryInfoExpanded)}
    />
  </div>
  <div class="DetailInfo-inner">
    <DetailInfoHeader
      {detailContent}
      {itemData}
      detailInfoExpanded={viewState.entryInfoExpanded}
      class="DetailInfo-header"
    />
    <DetailInfoBody
      {detailContent}
      {itemData}
      detailInfoExpanded={viewState.entryInfoExpanded}
      class="DetailInfo-body"
    />
  </div>
</div>

<style>
  :global {
    .DetailInfo-tool {
      padding: 0 calc(var(--line) * 0.5);
    }

    .DetailInfo-inner {
      display: grid;
      row-gap: calc(var(--line) * 0.5);
      padding: calc(var(--line) * 0.25) calc(var(--line) * 0.75) calc(var(--line) * 0.75);
    }
  }
</style>
