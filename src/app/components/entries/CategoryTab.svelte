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
    /* カテゴリーは下線のタブにして、人気・新着の切り替えボタンと見た目を分ける */
    .CategoryTab > .TabContent-tabList {
      flex-wrap: wrap;
      gap: 0;
      border-bottom: 1px solid var(--color-line);
      padding: 0 calc(var(--line) * 0.5);

      .TabContent-tab {
        position: relative;
        border-radius: 0;
        padding: 0.35em 0.6em 0.45em;
        background-color: transparent;
        color: var(--color-text-sub);

        &::after {
          position: absolute;
          right: 0.6em;
          bottom: -1px;
          left: 0.6em;
          border-radius: 2px 2px 0 0;
          height: 3px;
          content: "";
        }

        &:hover {
          background-color: transparent;
          color: var(--color-text);

          &::after {
            background-color: var(--color-line-strong);
          }
        }

        &[aria-selected="true"] {
          color: var(--color-accent);
          font-weight: var(--fw-bold);

          &::after {
            background-color: var(--color-accent);
          }
        }
      }
    }
  }
</style>
