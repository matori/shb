<script>
  import entryTypes from "~/constants/entryTypes"
  import { selectedTypeTabIndex } from "~/store/ui"
  import { entriesFetchErrorMessage, hasEntriesData } from "~/store/entries"
  import EntryList from "~/components/entry-list/EntryList.svelte"
  import EntriesFetchError from "~/components/entries/EntriesFetchError.svelte"
  import EntriesLink from "~/components/entries/EntriesLink.svelte"

  // 1つのカテゴリーの、選ばれている種類（人気・新着）の一覧。種類の切り替えは EntriesHeader にある
  let { category, data, class: className = "", ...rest } = $props()

  const type = $derived(entryTypes[$selectedTypeTabIndex] ?? entryTypes[0])
  const feed = $derived(data[type.key])
</script>

<div {...rest} class={[className, "CategoryEntries", "ScrollShadow"]}>
  <h3 class="CategoryEntries-heading">カテゴリー「{category.label}」の{type.label}エントリー</h3>
  {#if feed.initializing}
    <p class="CategoryEntries-initial">初期化中です</p>
  {:else if $entriesFetchErrorMessage && !$hasEntriesData}
    <EntriesFetchError display="entries" when="connection" message={$entriesFetchErrorMessage} />
  {:else if !feed.error}
    <EntryList items={feed.items} />
  {:else}
    <EntriesFetchError display="entries" when="api" message={feed.message} />
  {/if}
  <p class="CategoryEntries-helper">
    <EntriesLink {category} {type} class="CategoryEntries-link" />
  </p>
</div>

<style>
  :global {
    .CategoryEntries {
      height: 100%;
      overflow-y: auto;
    }

    .CategoryEntries-heading {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      border: 0;
      padding: 0;
      clip: rect(0 0 0 0);
      overflow: hidden;
    }

    .CategoryEntries-initial {
      font-size: var(--fs-m);
      line-height: var(--lh-m);
      margin: 0;
      border-bottom: 1px solid var(--color-line);
      padding: var(--line);
      color: var(--color-text-muted);
      text-align: center;
    }

    .CategoryEntries-helper {
      margin: 0;
      padding: var(--line);
      text-align: center;
    }
  }
</style>
