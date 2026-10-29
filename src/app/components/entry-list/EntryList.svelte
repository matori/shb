<script>
  import List from "~/elements/List"
  import EntryListItem from "~/components/entry-list/EntryListItem"

  let { items, class: className = "", ...rest } = $props()
</script>

<div {...rest} class={[className, "EntryList"]}>
  {#if items.length}
    <List class="EntryList-list">
      {#each items as item}
        <EntryListItem {item} class="EntryList-item" />
      {/each}
    </List>
  {:else}
    <div class="EntryList-noItems">
      <p class="EntryList-message">表示できるアイテムがありません。</p>
    </div>
  {/if}
</div>

<style>
  :global {
    .EntryList {
    }

    .EntryList-item {
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-bottom-color: var(--color-border-base);
    }

    .EntryList-message {
      font-size: var(--fs-m);
      line-height: var(--lh-m);
      margin: 0;
      padding: var(--line);
      text-align: center;
    }

    .EntryList-helper {
      margin: 0;
      padding: var(--line);
      text-align: center;
    }

    .EntryList-link {
    }
  }
</style>
