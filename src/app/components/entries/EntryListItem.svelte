<script>
  import { entryDetail } from "~/store/entryDetail.svelte.js"
  import userCountUnit from "~/utils/userCountUnit"
  import Button from "~/elements/Button.svelte"
  import Link from "~/elements/Link.svelte"
  import Time from "~/elements/Time.svelte"
  import SiteLink from "~/components/common/SiteLink.svelte"

  // エントリーの一覧の1件。ブックマーク数のボタンで、右のパネルにエントリー情報とコメントを開く
  // data-entry-url は、パネルを閉じたときにこのボタンへフォーカスを戻すのに使う
  let { entry, class: className = "", ...rest } = $props()
</script>

<li {...rest} class={[className, "EntryListItem"]} data-entry-url={entry.url}>
  <Link url={entry.url} class="EntryListItem-title">{entry.title}</Link>
  <Button class="EntryListItem-count" onclick={() => entryDetail.open(entry)}>
    {entry.bookmarkCount}
    <!-- 見た目は数字だけにして、単位とボタンの働きは読み上げで伝える -->
    <span class="VisuallyHidden">{userCountUnit(entry.bookmarkCount)}、エントリー情報とコメントを見る</span>
  </Button>
  <SiteLink
    url={entry.siteEntriesUrl}
    label={entry.siteEntriesLabel}
    favicon={entry.favicon}
    class="EntryListItem-site"
  />
  <Time datetime={entry.date} class="EntryListItem-date" />
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

    /* 2行まで表示して、それより長いタイトルは省略する */
    .EntryListItem-title {
      grid-column: 2 / 4;
      grid-row: 1 / 2;
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      display: -webkit-box;
      min-width: 0;
      overflow: hidden;
      color: var(--color-text);
      font-weight: var(--fw-medium);
      text-decoration: none;
      overflow-wrap: break-word;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;

      &:visited {
        color: var(--color-text-muted);
      }

      &:hover {
        color: var(--color-accent);
        text-decoration: underline;
      }
    }

    .EntryListItem-count {
      grid-column: 1 / 2;
      grid-row: 1 / 3;
      align-self: start;
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      border-radius: var(--radius-pill);
      padding: 0.1em 0;
      width: 100%;
      background-color: var(--color-count-bg);
      color: var(--color-count);
      font-weight: var(--fw-bold);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;

      &:hover {
        background-color: var(--color-count);
        color: var(--color-on-accent);
      }
    }

    .EntryListItem-site {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
      align-self: center;
      justify-self: start;
      min-width: 0;
    }

    .EntryListItem-date {
      grid-column: 3 / 4;
      grid-row: 2 / 3;
      align-self: center;
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      color: var(--color-text-muted);
      font-variant-numeric: tabular-nums;
    }
  }
</style>
