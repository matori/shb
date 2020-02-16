<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import { increment, decrement } from "~/utils/arrayIndex"
  import { selectedBookmarksTabIndex } from "~/store/ui"
  import TabContent from "~/components/common/TabContent"
  import Bookmarks from "~/components/bookmarks/Bookmarks"
  import BookmarksContainerHeader from "~/components/bookmarks/BookmarksContainerHeader"

  let data
  export { data }

  const removeAttrs = createNullValueObject(["data"])

  $: tabs = data.map((data, index) => {
    return {
      key: index.toString(),
      label: `${index + 1}階`,
    }
  })

  function onClickTab({ detail }) {
    selectedBookmarksTabIndex.set(detail.index)
  }

  function onKeydownRight(event) {
    const next = increment($selectedBookmarksTabIndex, data.length, true)
    const { items } = event.detail
    selectedBookmarksTabIndex.set(next)
    items[next].firstElementChild.focus()
  }

  function onKeydownLeft(event) {
    const prev = decrement($selectedBookmarksTabIndex, data.length, true)
    const { items } = event.detail
    selectedBookmarksTabIndex.set(prev)
    items[prev].firstElementChild.focus()
  }
</script>

<template>
  <section {...$$props} {...removeAttrs} class="{$$props.class || ''} BookmarksContainer">
    <BookmarksContainerHeader heading="コメント一覧" class="BookmarksContainer-header" />
    <div class="BookmarksContainer-body">
      {#if data.length > 1}
        <TabContent
          {tabs}
          selected="{$selectedBookmarksTabIndex}"
          class="BookmarksContainer-tabContent"
          on:click:tab="{onClickTab}"
          on:keydown:right="{onKeydownRight}"
          on:keydown:left="{onKeydownLeft}"
          let:key
          let:label
        >
          <Bookmarks content="{data[key].content}" class="BookmarksContainer-bookmarks" />
        </TabContent>
      {:else}
        <Bookmarks content="{data[0].content}" class="BookmarksContainer-bookmarks" />
      {/if}
    </div>
  </section>
</template>

<style lang="scss" global>
  .BookmarksContainer {
    display: grid;
    grid-template-rows: min-content 1fr;
    row-gap: get-lines(0.5) - $line-edge;
  }

  .BookmarksContainer-header {
  }

  .BookmarksContainer-body {
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: var(--color-border-base);
    min-height: 0;
    background-color: var(--color-bg-content);
    box-shadow: var(--shadow-base);
  }

  .BookmarksContainer-tabContent {
    --tab-border-color: var(--color-border-green);
    min-height: 0;
  }

  .BookmarksContainer-bookmarks {
    height: 100%;
  }
</style>
