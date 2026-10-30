<script>
  import { onMount } from "svelte"
  import entryCategories from "~/constants/entryCategories"
  import { viewState } from "~/store/viewState.svelte.js"
  import { entryFeeds } from "~/store/entryFeeds.svelte.js"
  import TabContent from "~/components/common/TabContent.svelte"
  import CategoryEntries from "~/components/entries/CategoryEntries.svelte"

  let { class: className = "", ...rest } = $props()

  onMount(() => {
    entryFeeds.load({ isInitialLoad: true })
  })
</script>

<TabContent
  {...rest}
  tabs={entryCategories}
  selected={viewState.selectedCategoryIndex}
  panelTabIndex={false}
  tabListClass="ScrollShadowX"
  class={[className, "CategoryTab"]}
  onselect={(index) => (viewState.selectedCategoryIndex = index)}
>
  {#snippet children({ key, label })}
    <CategoryEntries data={entryFeeds.response.data[key]} category={{ key, label }} />
  {/snippet}
</TabContent>

<style>
  :global {
    /*
     * カテゴリーは下線のタブにして、人気・新着の切り替えボタンと見た目を分ける
     * 1行に並べ、幅が余るときは各タブを広げてパネルの幅に合わせ、足りないときは横にスクロールする
     */
    .CategoryTab > .TabContent-tabList {
      gap: 0;
      overflow-x: auto;
      padding: 0 calc(var(--line) * 0.5);
      box-shadow: inset 0 -1px var(--color-line);
      scrollbar-width: thin;

      .TabContent-tabItem {
        flex: 1 0 auto;
      }

      .TabContent-tab {
        position: relative;
        border-radius: 0;
        padding: 0.35em 0.6em 0.45em;
        width: 100%;
        background-color: transparent;
        color: var(--color-text-sub);
        text-align: center;

        &::after {
          position: absolute;
          right: 0.6em;
          bottom: 0;
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
