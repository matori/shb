<script>
  import { tick } from "svelte"
  import { entryDetail } from "~/store/entryDetail.svelte.js"
  import Button from "~/elements/Button.svelte"
  import Icon from "~/elements/Icon.svelte"
  import FetchError from "~/components/common/FetchError.svelte"
  import LoadingIcon from "~/components/common/LoadingIcon.svelte"
  import EntryInfo from "~/components/entry-info/EntryInfo.svelte"
  import BookmarksPanel from "~/components/bookmarks/BookmarksPanel.svelte"

  // 右のパネル。一覧で選んだエントリーの情報とコメント一覧
  let { class: className = "", ...rest } = $props()

  const headingId = $props.id()
  const errorTitle = "詳細情報取得の際にエラーが発生しました"

  const floors = $derived(entryDetail.response?.data.entries ?? [])
  // 指定したURLのエントリー。ブックマークページを指定した場合は2階以降になる
  const floorIndex = $derived(entryDetail.response ? entryDetail.response.data.floor - 1 : 0)
  const floor = $derived(floors[floorIndex])

  // パネルを閉じると閉じるボタンもなくなるので、開いたときに押した一覧のボタンへフォーカスを戻す
  // そのボタンが見つからない（別のカテゴリーに切り替えたなど）ときは、インフォメーションの見出しへ移す
  async function close() {
    const url = entryDetail.entry?.url
    entryDetail.close()
    await tick()
    const opener = url && document.querySelector(`[data-entry-url="${CSS.escape(url)}"] button`)
    const target = opener?.checkVisibility() ? opener : document.querySelector(".Information-heading")
    target?.focus()
  }
</script>

<section {...rest} class={[className, "EntryDetailPanel"]} aria-labelledby={headingId}>
  <header class="EntryDetailPanel-header">
    <h2 id={headingId} class="EntryDetailPanel-heading">
      エントリー情報
      <LoadingIcon loading={entryDetail.isLoading} />
    </h2>
    <Button class="EntryDetailPanel-close" onclick={close}>
      <Icon name="close" class="EntryDetailPanel-closeIcon" />
      情報とコメントのパネルを閉じる
    </Button>
  </header>
  <div class="EntryDetailPanel-body">
    {#if entryDetail.errorMessage}
      <div class="EntryDetailPanel-message">
        <FetchError title={errorTitle} cause="connection" message={entryDetail.errorMessage} />
      </div>
    {:else if floors[0].error}
      <div class="EntryDetailPanel-message">
        <FetchError title={errorTitle} cause="api" message={floors[0].message} />
      </div>
    {:else if !floor}
      <!-- 指定したURLの階まで取得する前に失敗した場合 -->
      <div class="EntryDetailPanel-message">
        <FetchError
          title={errorTitle}
          cause="api"
          message="{floors.length + 1}階の取得に失敗したため、指定したページ（{floorIndex + 1}階）を表示できません"
        />
      </div>
    {:else if floor.content}
      <article class="EntryDetailPanel-content">
        <EntryInfo content={floor.content} entry={entryDetail.entry} class="EntryDetailPanel-info" />
        <div class="EntryDetailPanel-bookmarks">
          <BookmarksPanel {floors} partial={entryDetail.response.data.error} class="EntryDetailPanel-bookmarksPanel" />
        </div>
      </article>
    {:else}
      <div class="EntryDetailPanel-message">
        <p class="EntryDetailPanel-noBookmark">このエントリーはまだブックマークされていません</p>
      </div>
    {/if}
  </div>
</section>

<style>
  :global {
    /* 見出しの行と、その下（エントリー情報・エラー）をつなげて1枚のパネルに見せる */
    .EntryDetailPanel {
      display: grid;
      grid-template-rows: min-content auto;
    }

    /* 文字を大きくして1行に入らないときは、見出しの途中ではなく、要素ごとに折り返す */
    .EntryDetailPanel-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      /* 1行のときの間隔は space-between で空くので、折り返したときの行の間だけ空ける */
      row-gap: calc(var(--line) * 0.25);
      border-radius: var(--radius-panel) var(--radius-panel) 0 0;
      padding: calc(var(--line) * 0.6) calc(var(--line) * 0.75) calc(var(--line) * 0.25);
      background-color: var(--color-surface);
    }

    .EntryDetailPanel-heading {
      font-size: var(--fs-l);
      line-height: var(--lh-l);
      display: flex;
      align-items: center;
      margin: 0;
      font-weight: var(--fw-bold);
      white-space: nowrap;
    }

    .EntryDetailPanel-close {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      display: flex;
      align-items: center;
      gap: 0.25em;
      border-radius: var(--radius-pill);
      padding: 0.15em 0.8em;
      color: var(--color-text-sub);
      white-space: nowrap;

      &:hover {
        background-color: var(--color-surface-sub);
        color: var(--color-text);
      }
    }

    .EntryDetailPanel-closeIcon {
      width: calc(var(--fs-s) * var(--lh-s));
      height: calc(var(--fs-s) * var(--lh-s));
    }

    .EntryDetailPanel-body {
      min-height: 0;
    }

    .EntryDetailPanel-message {
      border-radius: 0 0 var(--radius-panel) var(--radius-panel);
      padding: calc(var(--line) * 0.5) calc(var(--line) * 0.75) calc(var(--line) * 0.75);
      background-color: var(--color-surface);
    }

    .EntryDetailPanel-noBookmark {
      font-size: var(--fs-m);
      line-height: var(--lh-m);
      margin: 0;
      color: var(--color-text-sub);
    }

    .EntryDetailPanel-content {
      display: grid;
      grid-template-rows: min-content 1fr;
      gap: calc(var(--line) * 0.75);
      height: 100%;
    }

    .EntryDetailPanel-info {
      border-radius: 0 0 var(--radius-panel) var(--radius-panel);
      background-color: var(--color-surface);
    }

    .EntryDetailPanel-bookmarks {
      min-height: 0;
    }

    .EntryDetailPanel-bookmarksPanel {
      max-height: 100%;
    }
  }
</style>
