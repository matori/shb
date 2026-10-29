<script>
  import { onMount } from "svelte"
  import entryCategories from "~/constants/entryCategories"
  import { selectedCategoryTabIndex } from "~/store/ui"
  import { entriesData } from "~/store/entries"
  import TabContent from "~/components/common/TabContent"
  import TypeTab from "~/components/entries/TypeTab"

  let { class: className = "", ...rest } = $props()

  onMount(() => {
    entriesData.update(true)
  })
</script>

<TabContent
  {...rest}
  tabs={entryCategories}
  selected={$selectedCategoryTabIndex}
  panelTabIndex={false}
  class={[className, "CategoryTab"]}
  onselect={(index) => selectedCategoryTabIndex.set(index)}
>
  {#snippet children({ key, label })}
    <TypeTab data={$entriesData.data[key]} category={{ key, label }} />
  {/snippet}
</TabContent>

<style>
  :global {
    /* すべてのカテゴリーが見えるよう、横幅が足りなければ折り返す */
    .CategoryTab > .TabContent-tabList {
      flex-wrap: wrap;
      padding: 0 calc(var(--line) * 0.75);
    }
  }
</style>
