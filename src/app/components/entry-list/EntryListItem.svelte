<script>
  import { detailData } from "~/store/detail"
  import EntryListItemLink from "~/components/entry-list/EntryListItemLink.svelte"
  import EntryListItemBookmarkCount from "~/components/entry-list/EntryListItemBookmarkCount.svelte"
  import EntryListItemSite from "~/components/entry-list/EntryListItemSite.svelte"
  import EntryListItemTime from "~/components/entry-list/EntryListItemTime.svelte"

  let { item, class: className = "", ...rest } = $props()

  function onClickBookmarkCount(event) {
    event.preventDefault()
    detailData.update(item)
  }
</script>

<li {...rest} class={[className, "EntryListItem"]}>
  <EntryListItemLink url={item.url} title={item.title} class="EntryListItem-title" />
  <EntryListItemBookmarkCount count={item.bookmarkCount} class="EntryListItem-count" onclick={onClickBookmarkCount} />
  <EntryListItemSite
    url={item.siteEntriesUrl}
    label={item.siteEntriesLabel}
    favicon={item.favicon}
    class="EntryListItem-site"
  />
  <EntryListItemTime datetime={item.date} class="EntryListItem-date" />
</li>

<style>
  :global {
    .EntryListItem {
      display: grid;
      grid-template-columns: 4.5em minmax(0, 1fr) auto;
      grid-template-rows: repeat(2, min-content);
      gap: 2px calc(var(--line) * 0.5);
      padding: calc(var(--line) * 0.4) calc(var(--line) * 0.5);
    }

    .EntryListItem-title {
      grid-column: 2 / 4;
      grid-row: 1 / 2;
      min-width: 0;
    }

    .EntryListItem-count {
      grid-column: 1 / 2;
      grid-row: 1 / 3;
    }

    .EntryListItem-site {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
      min-width: 0;
    }

    .EntryListItem-date {
      grid-column: 3 / 4;
      grid-row: 2 / 3;
    }
  }
</style>
