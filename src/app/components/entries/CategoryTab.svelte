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
    .CategoryTab {
      --tab-border-color: #42a5f5;
    }
  }
</style>
