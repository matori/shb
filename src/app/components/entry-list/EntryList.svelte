<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import List from "~/elements/List"
  import EnteryListItem from "~/components/entry-list/EntryListItem"

  // props
  let items
  export { items }

  const removeAttrs = createNullValueObject(["items"])
</script>

<template>
  <div {...$$props} {...removeAttrs} class="{$$props.class || ''} EntryList">
    {#if items.length}
      <List class="EntryList-list">
        {#each items as item, index}
          <EnteryListItem {item} class="EntryList-item" />
        {/each}
      </List>
    {:else}
      <div class="EntryList-noItems">
        <p class="EntryList-message">表示できるアイテムがありません。</p>
      </div>
    {/if}
  </div>
</template>

<style lang="scss" global>
  .EntryList {
  }

  .EntryList-item {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--color-border-base);
  }

  .EntryList-message {
    @include text(0);
    margin: 0;
    padding: get-lines(1);
    text-align: center;
  }

  .EntryList-helper {
    margin: 0;
    padding: get-lines(1);
    text-align: center;
  }

  .EntryList-link {
  }
</style>
