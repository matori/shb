<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import { detailInfoExpanded } from "~/store/ui"
  import DetailInfoToggleSwitch from "~/components/detail-info/DetailInfoToggleSwitch"
  import DetailInfoHeader from "~/components/detail-info/DetailInfoHeader.svelte"
  import DetailInfoBody from "~/components/detail-info/DetailInfoBody.svelte"

  let detailContent
  let itemData
  export { detailContent, itemData }

  const removeAttrs = createNullValueObject(["detailContent", "itemData"])

  let open

  detailInfoExpanded.subscribe(value => {
    open = value
  })

  function onClickToggleTrigger() {
    detailInfoExpanded.set(!open)
  }
</script>

<template>
  <div {...$$props} {...removeAttrs} class="{$$props.class || ''} DetailInfo" aria-expanded="{open}">
    <div class="DetailInfo-tool">
      <DetailInfoToggleSwitch
        open="{$detailInfoExpanded}"
        class="DetailInfo-switch"
        on:click="{onClickToggleTrigger}"
      />
    </div>
    <div class="DetailInfo-inner">
      <DetailInfoHeader {detailContent} {itemData} detailInfoExpanded="{open}" class="DetailInfo-header" />
      <DetailInfoBody {detailContent} {itemData} detailInfoExpanded="{open}" class="DetailInfo-body" />
    </div>
  </div>
</template>

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
    padding: get-lines(0.5) (get-lines(0.25) + rem($config-line-gap / 2));
  }

  .DetailInfo-header {
  }

  .DetailInfo-body {
  }
</style>
