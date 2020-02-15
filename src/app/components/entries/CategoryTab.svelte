<script>
  import { onMount } from "svelte"
  import entryCategories from "~/constants/entryCategories"
  import createNullValueObject from "~/utils/createNullValueObject"
  import { increment, decrement } from "~/utils/arrayIndex"
  import { selectedCategoryTabIndex } from "~/store/ui"
  import { entriesData } from "~/store/entries"
  import TabContent from "~/components/common/TabContent"
  import TypeTab from "~/components/entries/TypeTab"

  const removeAttrs = createNullValueObject([])

  const categoriesLength = entryCategories.length

  onMount(() => {
    entriesData.update(true)
  })

  function onClickTab({ detail }) {
    selectedCategoryTabIndex.set(detail.index)
  }

  function onKeydownRight(event) {
    const next = increment($selectedCategoryTabIndex, categoriesLength, true)
    const { items } = event.detail
    selectedCategoryTabIndex.set(next)
    items[next].firstElementChild.focus()
  }

  function onKeydownLeft(event) {
    const prev = decrement($selectedCategoryTabIndex, categoriesLength, true)
    const { items } = event.detail
    selectedCategoryTabIndex.set(prev)
    items[prev].firstElementChild.focus()
  }
</script>

<template>
  <TabContent
    {...$$props}
    {...removeAttrs}
    tabs="{entryCategories}"
    selected="{$selectedCategoryTabIndex}"
    panelTabIndex="{false}"
    class="{$$props.class || ''} CategoryTab"
    on:click:tab="{onClickTab}"
    on:keydown:right="{onKeydownRight}"
    on:keydown:left="{onKeydownLeft}"
    let:key
    let:label
  >
    <TypeTab data="{$entriesData.data[key]}" category="{{ key, label }}" />
  </TabContent>
</template>

<style lang="scss" global>
  .CategoryTab {
    --tab-border-color: #42a5f5;
  }
</style>
