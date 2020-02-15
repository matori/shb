<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import { hasDetailData, detailFetchErrorMessage, detailData } from "~/store/detail"
  import EntriesContainer from "~/components/entries/EntriesContainer"
  import DetailContainer from "~/components/detail/DetailContainer"
  import Information from "~/components/information/Information.svelte"

  const removeAttrs = createNullValueObject([])
</script>

<template>
  <div {...$$props} {...removeAttrs} class="{$$props.class || ''} ContentContainer">
    <EntriesContainer class="ContentContainer-entries" />
    {#if $detailFetchErrorMessage || $hasDetailData}
      <DetailContainer detail="{$detailData}" message="{$detailFetchErrorMessage}" class="ContentContainer-detail" />
    {:else}
      <Information class="ContentContainer-info" />
    {/if}
  </div>
</template>

<style lang="scss" global>
  .ContentContainer {
    display: grid;
    grid-template-columns: repeat(2, calc(50% - #{get-lines(0.5)}));
    column-gap: get-lines(1);
  }

  .ContentContainer-entries,
  .ContentContainer-detail,
  .ContentContainer-info {
    min-height: 0;
  }
</style>
