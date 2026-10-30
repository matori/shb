<script>
  import { entryDetail } from "~/store/entryDetail.svelte.js"
  import { viewState } from "~/store/viewState.svelte.js"
  import { BOOKMARK_ORDERS } from "~/utils/sortBookmarks"
  import Tabs from "~/components/common/Tabs.svelte"
  import ToggleButton from "~/components/common/ToggleButton.svelte"
  import FloorBookmarks from "~/components/bookmarks/FloorBookmarks.svelte"

  // コメント一覧。ブックマークページもブックマークされている（メタブ）ときは、階ごとのタブにする
  // - floors: detail API の data.entries
  // - partial: 途中の階で取得に失敗し、floors が途中までしかない
  let { floors, partial = false, class: className = "", ...rest } = $props()

  const headingId = $props.id()

  const tabs = $derived(floors.map((_, index) => ({ key: index.toString(), label: `${index + 1}階` })))
  // スターの多い順を選んでいても、スターを取得できなければ新しい順のままになる
  const starsUnavailable = $derived(viewState.bookmarkOrder === "stars" && entryDetail.starsStatus === "failed")
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
      <label class="BookmarksPanel-order">
        並び順
        <select class="BookmarksPanel-orderSelect" bind:value={viewState.bookmarkOrder}>
          {#each BOOKMARK_ORDERS as { value, label } (value)}
            <option {value}>{label}</option>
          {/each}
        </select>
      </label>
    </div>
  </header>
  <!-- 中身が入ったときに読み上げられるよう、知らせる場所は常に置いておく -->
  <div role="status">
    {#if partial}
      <p class="BookmarksPanel-notice">
        {floors.length + 1}階の取得に失敗したため、{floors.length}階までを表示しています。もう一度開くと取得し直します。
      </p>
    {/if}
    {#if starsUnavailable}
      <p class="BookmarksPanel-notice">スターを取得できなかったため、新しい順で表示しています。</p>
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

    /* 文字を大きくして1行に入らないときは、見出しの途中ではなく、要素ごとに折り返す */
    .BookmarksPanel-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      /* 1行のときの間隔は space-between で空くので、折り返したときの行の間だけ空ける */
      row-gap: calc(var(--line) * 0.25);
      padding: calc(var(--line) * 0.6) calc(var(--line) * 0.75) calc(var(--line) * 0.4);
    }

    .BookmarksPanel-heading {
      font-size: var(--fs-l);
      line-height: var(--lh-l);
      margin: 0;
      font-weight: var(--fw-bold);
      white-space: nowrap;
    }

    .BookmarksPanel-tools {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: calc(var(--line) * 0.5);
    }

    .BookmarksPanel-toggle {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      padding: 0.2em 0.7em;
    }

    .BookmarksPanel-order {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: flex;
      align-items: center;
      gap: 0.4em;
      color: var(--color-text-sub);
      white-space: nowrap;
    }

    .BookmarksPanel-orderSelect {
      font: inherit;
      border: 1px solid var(--color-line-strong);
      border-radius: var(--radius-control);
      padding: 0.15em 0.4em;
      background-color: var(--color-surface);
      color: var(--color-text);
      accent-color: var(--color-accent);
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
