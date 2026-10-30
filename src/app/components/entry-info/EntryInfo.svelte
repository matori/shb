<script>
  import { viewState } from "~/store/viewState.svelte.js"
  import { entryDetail } from "~/store/entryDetail.svelte.js"
  import userCountUnit from "~/utils/userCountUnit"
  import Button from "~/elements/Button.svelte"
  import Icon from "~/elements/Icon.svelte"
  import Link from "~/elements/Link.svelte"
  import List from "~/elements/List.svelte"
  import Time from "~/elements/Time.svelte"
  import SiteLink from "~/components/common/SiteLink.svelte"
  import StarCount from "~/components/common/StarCount.svelte"
  import EntryInfoImage from "~/components/entry-info/EntryInfoImage.svelte"

  // エントリーのタイトル・ブックマーク数・カテゴリー・概要・画像・タグなど
  // - content: detail API の、表示する階の content（タイトル・URL・ブックマーク数）
  // - entry: 一覧で選んだエントリー（カテゴリー・サイト・日時・概要・画像・タグ）
  // 折りたたんでいるときは、タイトルを1行にして、概要・画像・タグを隠す
  let { content, entry, class: className = "", ...rest } = $props()

  const bodyId = $props.id()
  const expanded = $derived(viewState.entryInfoExpanded)
  const searchXUrl = $derived(`https://x.com/search?q=${encodeURIComponent(content.url)}`)
</script>

<div {...rest} class={[className, "EntryInfo"]}>
  <div class="EntryInfo-tool">
    <Button
      class="EntryInfo-toggle"
      aria-expanded={expanded}
      aria-controls={bodyId}
      onclick={() => (viewState.entryInfoExpanded = !expanded)}
    >
      {expanded ? "エントリー情報を折りたたむ" : "エントリー情報を展開する"}
      <Icon name={expanded ? "collapse" : "expand"} class="EntryInfo-toggleIcon" />
    </Button>
  </div>
  <div class="EntryInfo-inner">
    <header class="EntryInfo-header">
      <h3 class={["EntryInfo-title", { _singleLine: !expanded }]}>
        <Link url={content.url} title={expanded ? null : content.title} class="EntryInfo-titleLink">
          {content.title}
        </Link>
      </h3>
      <div class="EntryInfo-counts">
        <Link url={content.entry_url} class="EntryInfo-bookmarkCount">
          <span>{content.count}</span>
          <span class="EntryInfo-bookmarkCountUnit">{userCountUnit(content.count)}</span>
        </Link>
        <!-- エントリー本体（記事のURL）へのスター -->
        <StarCount stars={entryDetail.entryStars(content.eid)} />
      </div>
      {#if entry.realCategory.label}
        <!-- カテゴリーが判別できなかった場合、slug は false になる -->
        {#if entry.realCategory.slug}
          <Link url="https://b.hatena.ne.jp/hotentry/{entry.realCategory.slug}" class="EntryInfo-category">
            {entry.realCategory.label}
          </Link>
        {:else}
          <span class="EntryInfo-category">{entry.realCategory.label}</span>
        {/if}
      {/if}
      <SiteLink
        url={entry.siteEntriesUrl}
        label={entry.siteEntriesLabel}
        favicon={entry.favicon}
        class="EntryInfo-site"
      />
      <Time datetime={entry.date} title="最初にブックマークされた日時" class="EntryInfo-date" />
    </header>
    <div
      id={bodyId}
      class={["EntryInfo-body", { _hasImage: entry.image, _hasTags: entry.tags.length, _collapsed: !expanded }]}
    >
      <p class="EntryInfo-description">{entry.description || "詳細データはありません。"}</p>
      {#if entry.image}
        <!-- 別のエントリーを開いたら、画像の読み込みエラーの状態を引き継がないように作り直す -->
        {#key entry.image}
          <EntryInfoImage image={entry.image} class="EntryInfo-image" />
        {/key}
      {/if}
      {#if entry.tags.length}
        <div class="EntryInfo-tags">
          <Icon name="tag" class="EntryInfo-tagIcon" />
          <List class="EntryInfo-tagList" aria-label="このエントリーにつけられた主なタグ">
            {#each entry.tags as tag (tag.url)}
              <li>
                <Link url={tag.url} class="EntryInfo-tag">{tag.label}</Link>
              </li>
            {/each}
          </List>
        </div>
      {/if}
      <Link url={searchXUrl} class="EntryInfo-searchX">
        <Icon name="x" class="EntryInfo-xIcon" />
        XでURL検索
      </Link>
    </div>
  </div>
</div>

<style>
  :global {
    .EntryInfo-tool {
      padding: 0 calc(var(--line) * 0.5);
    }

    .EntryInfo-toggle {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: inline-flex;
      align-items: center;
      gap: 0.25em;
      border-radius: var(--radius-pill);
      padding: 0.2em 0.6em;
      color: var(--color-text-muted);
      white-space: nowrap;

      &:hover {
        background-color: var(--color-surface-sub);
        color: var(--color-text);
      }
    }

    .EntryInfo-toggleIcon {
      width: calc(var(--fs-xs) * var(--lh-xs));
      height: calc(var(--fs-xs) * var(--lh-xs));
    }

    .EntryInfo-inner {
      display: grid;
      row-gap: calc(var(--line) * 0.5);
      padding: calc(var(--line) * 0.25) calc(var(--line) * 0.75) calc(var(--line) * 0.75);
    }

    .EntryInfo-header {
      display: grid;
      grid-template-columns: min-content min-content 1fr min-content;
      align-items: center;
      row-gap: calc(var(--line) * 0.4);
      column-gap: calc(var(--line) * 0.5);
    }

    .EntryInfo-title {
      grid-column: 1 / 5;
      min-width: 0;
      font-size: var(--fs-xl);
      line-height: var(--lh-xl);
      margin: 0;
      font-weight: var(--fw-bold);

      &._singleLine {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .EntryInfo-titleLink {
      overflow-wrap: break-word;
      color: var(--color-text);
      text-decoration: none;

      &:hover {
        color: var(--color-accent);
        text-decoration: underline;
      }
    }

    .EntryInfo-counts {
      grid-column: 1 / 2;
      display: flex;
      align-items: center;
      gap: calc(var(--line) * 0.4);
    }

    .EntryInfo-bookmarkCount {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      display: inline-flex;
      align-items: baseline;
      gap: 0.2em;
      border-radius: var(--radius-pill);
      padding: 0.05em 0.8em;
      background-color: var(--color-count-bg);
      color: var(--color-count);
      font-weight: var(--fw-bold);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      text-decoration: none;

      &:hover {
        background-color: var(--color-count);
        color: var(--color-on-accent);
      }
    }

    .EntryInfo-bookmarkCountUnit {
      font-size: var(--fs-xs);
    }

    .EntryInfo-category {
      grid-column: 2 / 3;
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: block;
      border-radius: var(--radius-pill);
      padding: 0.05em 0.8em;
      background-color: var(--color-category-bg);
      color: var(--color-category);
      font-weight: var(--fw-medium);
      text-decoration: none;
      white-space: nowrap;

      /* リンクでない（カテゴリーが判別できなかった）ときは下線を出さない */
      &:is(a):hover {
        color: var(--color-category);
        text-decoration: underline;
      }
    }

    .EntryInfo-site {
      grid-column: 3 / 4;
      justify-self: start;
      min-width: 0;
    }

    .EntryInfo-date {
      grid-column: 4 / 5;
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      color: var(--color-text-muted);
      font-variant-numeric: tabular-nums;
    }

    .EntryInfo-body {
      --c-gap: calc(var(--line) * 0.25 + var(--line-edge));
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: min-content 1fr;
      column-gap: var(--c-gap);
      row-gap: calc(var(--line) * 0.5);

      &._hasImage {
        grid-template-columns: 1fr fit-content(calc(30% - var(--c-gap) / 2));
      }

      &._hasTags {
        grid-template-rows: min-content min-content 1fr;
      }

      &._collapsed {
        display: block;

        .EntryInfo-description,
        .EntryInfo-image,
        .EntryInfo-tags {
          display: none;
        }
      }
    }

    .EntryInfo-description {
      grid-column: 1 / 2;
      min-width: 0;
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      margin: 0;
      color: var(--color-text-sub);
      overflow-wrap: break-word;
    }

    .EntryInfo-image {
      grid-column: 2 / 3;
      grid-row: 1 / 4;
    }

    .EntryInfo-tags {
      grid-column: 1 / 2;
      min-width: 0;
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: flex;
      align-items: flex-start;
      gap: 0.4em;
      color: var(--color-text-muted);
    }

    .EntryInfo-tagIcon {
      flex-shrink: 0;
      margin-top: 0.2em;
      width: 1.1em;
      height: 1.1em;
    }

    .EntryInfo-tagList {
      display: flex;
      flex-wrap: wrap;
      gap: 0.3em;
    }

    .EntryInfo-tag {
      display: block;
      border-radius: var(--radius-pill);
      padding: 0.05em 0.7em;
      background-color: var(--color-surface-sub);
      color: var(--color-text-sub);
      text-decoration: none;

      &:hover {
        background-color: var(--color-line-strong);
        color: var(--color-text);
      }
    }

    .EntryInfo-searchX {
      grid-column: 1 / 2;
      justify-self: start;
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: inline-flex;
      align-items: center;
      gap: 0.4em;
      color: var(--color-text-sub);
      text-decoration: none;

      &:hover {
        color: var(--color-text);
        text-decoration: underline;
      }
    }

    .EntryInfo-xIcon {
      width: 1em;
      height: 1em;
      color: var(--color-text);
    }
  }
</style>
