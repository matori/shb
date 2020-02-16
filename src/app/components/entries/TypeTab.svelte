<script>
  import entryTypes from "~/constants/entryTypes"
  import createNullValueObject from "~/utils/createNullValueObject"
  import { increment, decrement } from "~/utils/arrayIndex"
  import { selectedTypeTabIndex } from "~/store/ui"
  import { entriesFetchErrorMessage } from "~/store/entries"
  import TabContent from "~/components/common/TabContent"
  import EntryList from "~/components/entry-list/EntryList"
  import EntriesFetchError from "~/components/entries/EntriesFetchError"
  import EntriesLink from "~/components/entries/EntriesLink"

  // props
  let category
  let data
  export { category, data }

  const removeAttrs = createNullValueObject(["category", "data"])

  const typesLength = entryTypes.length

  function onClickTab({ detail }) {
    selectedTypeTabIndex.set(detail.index)
  }

  function onKeydownRight(event) {
    const next = increment($selectedTypeTabIndex, typesLength, true)
    const { items } = event.detail
    selectedTypeTabIndex.set(next)
    items[next].firstElementChild.focus()
  }

  function onKeydownLeft(event) {
    const prev = decrement($selectedTypeTabIndex, typesLength, true)
    const { items } = event.detail
    selectedTypeTabIndex.set(prev)
    items[prev].firstElementChild.focus()
  }
</script>

<template>
  <TabContent
    {...$$props}
    {...removeAttrs}
    class="{$$props.class || ''} TypeTab"
    tabs="{entryTypes}"
    selected="{$selectedTypeTabIndex}"
    label="カテゴリー「{category.label}」の人気エントリーと新着エントリー"
    on:click:tab="{onClickTab}"
    on:keydown:right="{onKeydownRight}"
    on:keydown:left="{onKeydownLeft}"
    let:key
    let:label
  >
    <h3 class="TypeTab-heading">カテゴリー「{category.label}」の{label}エントリー</h3>
    {#if data[key].initializing}
      <p class="TypeTab-initial">初期化中です</p>
    {:else if $entriesFetchErrorMessage}
      <EntriesFetchError display="entries" when="connection" message="{$entriesFetchErrorMessage}" />
    {:else if !data[key].error}
      <EntryList items="{data[key].items}" />
    {:else if data[key].error}
      <EntriesFetchError display="entries" when="api" message="{data[key].message}" />
    {:else}
      <EntriesFetchError display="entries" />
    {/if}
    <p class="TypeTab-helper">
      <EntriesLink {category} type="{{ key, label }}" class="TypeTab-link" />
    </p>
  </TabContent>
</template>

<style lang="scss" global>
  .TypeTab {
    --tab-border-color: #4db6ac;

    .TabContent-panel {
      overflow-y: scroll;
    }
  }

  .TypeTab-heading {
    @include visually-hidden;
  }

  .TypeTab-initial {
    @include text(0);
    margin: 0;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--color-border-base);
    padding: get-lines(1);
    text-align: center;
  }

  .TypeTab-helper {
    margin: 0;
    padding: get-lines(1);
    text-align: center;
  }

  .TypeTab-link {
  }
</style>
