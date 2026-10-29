<script>
  import entryTypes from "~/constants/entryTypes"
  import { selectedTypeTabIndex } from "~/store/ui"
  import { entriesFetchErrorMessage, hasEntriesData } from "~/store/entries"
  import TabContent from "~/components/common/TabContent"
  import EntryList from "~/components/entry-list/EntryList"
  import EntriesFetchError from "~/components/entries/EntriesFetchError"
  import EntriesLink from "~/components/entries/EntriesLink"

  let { category, data, class: className = "", ...rest } = $props()
</script>

<TabContent
  {...rest}
  class={[className, "TypeTab"]}
  tabs={entryTypes}
  selected={$selectedTypeTabIndex}
  label="カテゴリー「{category.label}」の人気エントリーと新着エントリー"
  onselect={(index) => selectedTypeTabIndex.set(index)}
>
  {#snippet children({ key, label })}
    <h3 class="TypeTab-heading">カテゴリー「{category.label}」の{label}エントリー</h3>
    {#if data[key].initializing}
      <p class="TypeTab-initial">初期化中です</p>
    {:else if $entriesFetchErrorMessage && !$hasEntriesData}
      <EntriesFetchError display="entries" when="connection" message={$entriesFetchErrorMessage} />
    {:else if !data[key].error}
      <EntryList items={data[key].items} />
    {:else if data[key].error}
      <EntriesFetchError display="entries" when="api" message={data[key].message} />
    {:else}
      <EntriesFetchError display="entries" />
    {/if}
    <p class="TypeTab-helper">
      <EntriesLink {category} type={{ key, label }} class="TypeTab-link" />
    </p>
  {/snippet}
</TabContent>

<style>
  :global {
    .TypeTab {
      --tab-border-color: #4db6ac;

      .TabContent-panel {
        overflow-y: scroll;
      }
    }

    .TypeTab-heading {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      border: 0;
      padding: 0;
      clip: rect(0 0 0 0);
      overflow: hidden;
    }

    .TypeTab-initial {
      font-size: var(--fs-m);
      line-height: var(--lh-m);
      margin: 0;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-bottom-color: var(--color-border-base);
      padding: var(--line);
      text-align: center;
    }

    .TypeTab-helper {
      margin: 0;
      padding: var(--line);
      text-align: center;
    }

    .TypeTab-link {
    }
  }
</style>
