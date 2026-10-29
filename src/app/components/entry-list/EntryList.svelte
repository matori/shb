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
    .EntryList-list {
      margin: 0;
      padding: 0 calc(var(--line) * 0.25);
      list-style: none;
    }

    /* カテゴリーのタブと近すぎないよう、先頭のエントリーだけ上の余白を広げる */
    .EntryList-item:first-child {
      padding-top: calc(var(--line) * 0.75);
    }

    .EntryList-item {
      border-bottom: 1px solid var(--color-line);
    }

    .EntryList-message {
      font-size: var(--fs-m);
      line-height: var(--lh-m);
      margin: 0;
      padding: var(--line);
      color: var(--color-text-muted);
      text-align: center;
    }
  }
</style>
