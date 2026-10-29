<script>
  import { selectedBookmarksTabIndex } from "~/store/ui"
  import TabContent from "~/components/common/TabContent"
  import Bookmarks from "~/components/bookmarks/Bookmarks"
  import BookmarksContainerHeader from "~/components/bookmarks/BookmarksContainerHeader"

  // partial: 途中の階で取得に失敗し、data が途中までしかない
  let { data, partial = false, class: className = "", ...rest } = $props()

  const tabs = $derived(
    data.map((_, index) => ({
      key: index.toString(),
      label: `${index + 1}階`,
    })),
  )
</script>

<section {...rest} class={[className, "BookmarksContainer"]}>
  <BookmarksContainerHeader heading="コメント一覧" class="BookmarksContainer-header" />
  {#if partial}
    <p class="BookmarksContainer-notice" role="status">
      {data.length + 1}階の取得に失敗したため、{data.length}階までを表示しています。もう一度開くと取得し直します。
    </p>
  {/if}
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
      border-radius: var(--radius-panel);
      overflow: hidden;
      background-color: var(--color-surface);

      &:has(> .BookmarksContainer-notice) {
        grid-template-rows: min-content min-content 1fr;
      }
    }

    .BookmarksContainer-notice {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      margin: 0;
      padding: 0 calc(var(--line) * 0.75) calc(var(--line) * 0.4);
      color: var(--color-error);
    }

    .BookmarksContainer-body {
      min-height: 0;
    }

    .BookmarksContainer-tabContent {
      min-height: 0;

      & > .TabContent-tabList {
        padding: 0 calc(var(--line) * 0.75) calc(var(--line) * 0.5);
      }
    }

    .BookmarksContainer-bookmarks {
      height: 100%;
    }
  }
</style>
