<script>
  import { selectedBookmarksTabIndex } from "~/store/ui"
  import TabContent from "~/components/common/TabContent"
  import Bookmarks from "~/components/bookmarks/Bookmarks"
  import BookmarksContainerHeader from "~/components/bookmarks/BookmarksContainerHeader"

  let { data, class: className = "", ...rest } = $props()

  const tabs = $derived(
    data.map((_, index) => ({
      key: index.toString(),
      label: `${index + 1}階`,
    })),
  )
</script>

<section {...rest} class={[className, "BookmarksContainer"]}>
  <BookmarksContainerHeader heading="コメント一覧" class="BookmarksContainer-header" />
  <div class="BookmarksContainer-body">
    {#if data.length > 1}
      <TabContent
        {tabs}
        selected={$selectedBookmarksTabIndex}
        class="BookmarksContainer-tabContent"
        onselect={(index) => selectedBookmarksTabIndex.set(index)}
      >
        {#snippet children({ key })}
          <Bookmarks content={data[key].content} class="BookmarksContainer-bookmarks" />
        {/snippet}
      </TabContent>
    {:else}
      <Bookmarks content={data[0].content} class="BookmarksContainer-bookmarks" />
    {/if}
  </div>
</section>

<style>
  :global {
    .BookmarksContainer {
      display: grid;
      grid-template-rows: min-content 1fr;
      row-gap: calc(var(--line) * 0.5 - var(--line-edge));
    }

    .BookmarksContainer-header {
    }

    .BookmarksContainer-body {
      box-sizing: border-box;
      border-width: 1px;
      border-style: solid;
      border-color: var(--color-border-base);
      min-height: 0;
      background-color: var(--color-bg-content);
      box-shadow: var(--shadow-base);
    }

    .BookmarksContainer-tabContent {
      --tab-border-color: var(--color-border-green);
      min-height: 0;
    }

    .BookmarksContainer-bookmarks {
      height: 100%;
    }
  }
</style>
