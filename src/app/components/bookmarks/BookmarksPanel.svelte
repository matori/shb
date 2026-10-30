<script>
  import { entryDetail } from "~/store/entryDetail.svelte.js"
  import { viewState } from "~/store/viewState.svelte.js"
  import Tabs from "~/components/common/Tabs.svelte"
  import ToggleButton from "~/components/common/ToggleButton.svelte"
  import FloorBookmarks from "~/components/bookmarks/FloorBookmarks.svelte"

  // コメント一覧。ブックマークページもブックマークされている（メタブ）ときは、階ごとのタブにする
  // - floors: detail API の data.entries
  // - partial: 途中の階で取得に失敗し、floors が途中までしかない
  let { floors, partial = false, class: className = "", ...rest } = $props()

  const headingId = $props.id()

  const tabs = $derived(floors.map((_, index) => ({ key: index.toString(), label: `${index + 1}階` })))
</script>

<section {...rest} class={[className, "BookmarksPanel"]} aria-labelledby={headingId}>
  <header class="BookmarksPanel-header">
    <h3 id={headingId} class="BookmarksPanel-heading">コメント一覧</h3>
    <div class="BookmarksPanel-tools">
      <ToggleButton
        title="コメントのないブックマークも表示する"
        class="BookmarksPanel-toggle"
        bind:checked={viewState.includeBookmarksWithoutComment}
      >
        全ブックマーク表示
      </ToggleButton>
      <ToggleButton
        title="ブックマーク日時が古い順に並び替える"
        class="BookmarksPanel-toggle"
        bind:checked={viewState.showOldestBookmarksFirst}
      >
        古い順で表示
      </ToggleButton>
    </div>
  </header>
  <!-- 中身が入ったときに読み上げられるよう、知らせる場所は常に置いておく -->
  <div role="status">
    {#if partial}
      <p class="BookmarksPanel-notice">
        {floors.length + 1}階の取得に失敗したため、{floors.length}階までを表示しています。もう一度開くと取得し直します。
      </p>
    {/if}
  </div>
  <div class="BookmarksPanel-body">
    {#if floors.length > 1}
      <Tabs
        {tabs}
        label="階"
        selected={entryDetail.selectedFloorIndex}
        class="BookmarksPanel-tabs"
        onselect={(index) => (entryDetail.selectedFloorIndex = index)}
      >
        {#snippet children({ key })}
          <FloorBookmarks content={floors[key].content} />
        {/snippet}
      </Tabs>
    {:else}
      <FloorBookmarks content={floors[0].content} />
    {/if}
  </div>
</section>

<style>
  :global {
    .BookmarksPanel {
      display: grid;
      grid-template-rows: min-content min-content 1fr;
      border-radius: var(--radius-panel);
      overflow: hidden;
      background-color: var(--color-surface);
    }

    .BookmarksPanel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: calc(var(--line) * 0.6) calc(var(--line) * 0.75) calc(var(--line) * 0.4);
    }

    .BookmarksPanel-heading {
      font-size: var(--fs-l);
      line-height: var(--lh-l);
      margin: 0;
      font-weight: var(--fw-bold);
    }

    .BookmarksPanel-tools {
      display: flex;
      gap: calc(var(--line) * 0.25);
    }

    .BookmarksPanel-toggle {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      padding: 0.2em 0.7em;
    }

    .BookmarksPanel-notice {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      margin: 0;
      padding: 0 calc(var(--line) * 0.75) calc(var(--line) * 0.4);
      color: var(--color-error);
    }

    .BookmarksPanel-body {
      min-height: 0;
    }

    .BookmarksPanel-tabs {
      min-height: 0;

      & > .Tabs-tabList {
        padding: 0 calc(var(--line) * 0.75) calc(var(--line) * 0.5);
      }
    }
  }
</style>
