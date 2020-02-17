<script>
  import { beforeUpdate } from "svelte"
  import createNullValueObject from "~/utils/createNullValueObject"
  import { selectedBookmarksTabIndex } from "~/store/ui"
  import DetailContent from "~/components/detail/DetailContent"
  import DetailFetchError from "~/components/detail/DetailFetchError.svelte"
  import DetailHeader from "~/components/detail/DetailHeader"
  import DetailNoBookmarkError from "~/components/detail/DetailNoBookmarkError.svelte"

  let detail
  let message
  export { detail, message }

  const removeAttrs = createNullValueObject(["detail", "message"])

  $: data = detail ? detail.data : null
  $: data0 = detail ? detail.data.entries[detail.data.floor - 1] : null
  $: itemData = detail ? detail.itemData : null

  beforeUpdate(() => {
    selectedBookmarksTabIndex.set(detail ? detail.data.floor - 1 : 0)
  })
</script>

<template>
  <section {...$$props} {...removeAttrs} class="{$$props.class || ''} DetailContainer">
    <DetailHeader heading="エントリー情報" class="DetailContainer-header" />
    <div class="DetailContainer-body">
      {#if message}
        <DetailFetchError display="detail" when="connection" {message} />
      {:else if data0.error}
        <DetailFetchError display="detail" when="api" message="{data0.message}" />
      {:else if data0.content}
        <DetailContent
          detailData="{data}"
          {itemData}
          infoIndex="{detail.data.floor - 1}"
          class="DetailContainer-content"
        />
      {:else}
        <DetailNoBookmarkError class="DetailContainer-noBookmark" />
      {/if}
    </div>
  </section>
</template>

<style lang="scss" global>
  .DetailContainer {
    display: grid;
    grid-template-rows: min-content auto;
    row-gap: get-lines(0.5) - $line-edge;
  }

  .DetailContainer-header {
  }

  .DetailContainer-body {
    min-height: 0;
  }

  .DetailContainer-content {
    height: 100%;
  }
</style>
