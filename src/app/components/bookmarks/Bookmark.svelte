<script>
  import Icon from "~/elements/Icon.svelte"
  import Link from "~/elements/Link.svelte"
  import List from "~/elements/List.svelte"
  import Time from "~/elements/Time.svelte"
  import UserAvatar from "~/components/bookmarks/UserAvatar.svelte"

  // 1件のブックマーク（プロフィール画像・ユーザー名・コメント・タグ・パーマリンク・日時）
  // - eid: このブックマークがついているエントリーのID。パーマリンクに使う
  let { bookmark, eid, class: className = "", ...rest } = $props()

  const userUrl = $derived(`https://b.hatena.ne.jp/${bookmark.user}/`)
  // timestamp は「2019/12/13 17:47」の形の日本時間
  const [date, time] = $derived(bookmark.timestamp.split(" "))
  const datetime = $derived(`${date.replaceAll("/", "-")}T${time}:00+09:00`)
  // はてなブックマークのURLの日付も日本時間なので、閲覧している環境のタイムゾーンに関係なく timestamp の日付を使う
  const bookmarkUrl = $derived(`${userUrl}${date.replaceAll("/", "")}#bookmark-${eid}`)
  const commentUrl = $derived(`https://b.hatena.ne.jp/entry/${eid}/comment/${bookmark.user}`)
</script>

<div {...rest} class={[className, "Bookmark"]}>
  <UserAvatar user={bookmark.user} class="Bookmark-avatar" />
  <div class="Bookmark-body">
    <Link url={userUrl} class="Bookmark-user">{bookmark.user}</Link>
    {#if bookmark.comment}
      <p class="Bookmark-comment">
        {#each bookmark.commentParts as part, index (index)}
          {#if part.url}
            <Link url={part.url} class="Bookmark-commentLink">{part.text}</Link>
          {:else}{part.text}{/if}
        {/each}
      </p>
    {/if}
    {#if bookmark.tags.length}
      <div class="Bookmark-tags">
        <Icon name="tag" class="Bookmark-tagIcon" />
        <List class="Bookmark-tagList" aria-label="{bookmark.user}がつけたタグ">
          {#each bookmark.tags as tag (tag)}
            <li class="Bookmark-tagItem">
              <Link url="{userUrl}{encodeURIComponent(tag)}/" class="Bookmark-tag">{tag}</Link>
            </li>
          {/each}
        </List>
      </div>
    {/if}
  </div>
  {#if bookmark.comment}
    <Link url={commentUrl} title="コメントのパーマリンク" class="Bookmark-permalink">
      <Icon name="link" class="Bookmark-permalinkIcon" />
      Permalink
    </Link>
  {/if}
  <Link url={bookmarkUrl} title="ブックマークのパーマリンク" class="Bookmark-date">
    <Time {datetime} showSeconds={false} />
  </Link>
</div>

<style>
  :global {
    .Bookmark {
      display: grid;
      grid-template-columns: min-content 1fr min-content min-content;
      grid-template-rows: repeat(2, auto);
      column-gap: calc(var(--line) * 0.5);
      row-gap: 2px;
      padding: calc(var(--line) * 0.5) calc(var(--line) * 0.75);
    }

    .Bookmark-avatar {
      grid-column: 1 / 2;
      grid-row: 1 / 3;
    }

    .Bookmark-body {
      grid-column: 2 / 5;
      grid-row: 1 / 2;
      min-width: 0;
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      display: grid;
      row-gap: 2px;
    }

    .Bookmark-user {
      justify-self: start;
      color: var(--color-text);
      font-weight: var(--fw-bold);
      text-decoration: none;

      &:hover {
        color: var(--color-accent);
        text-decoration: underline;
      }
    }

    .Bookmark-comment {
      min-width: 0;
      margin: 0;
      color: var(--color-text);
      word-break: break-all;
    }

    .Bookmark-commentLink {
      color: var(--color-accent);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .Bookmark-tags {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: flex;
      gap: 0.3em;
      color: var(--color-text-muted);
    }

    .Bookmark-tagIcon {
      flex-shrink: 0;
      margin-top: 0.15em;
      width: 1.1em;
      height: 1.1em;
    }

    .Bookmark-tagItem {
      display: inline;
      margin-right: 0.5em;
      word-break: break-word;
    }

    .Bookmark-tag {
      color: inherit;
      text-decoration: none;

      &:hover {
        color: var(--color-text-sub);
        text-decoration: underline;
      }
    }

    .Bookmark-permalink {
      grid-column: 3 / 4;
      grid-row: 2 / 3;
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: flex;
      align-items: center;
      gap: 0.25em;
      color: var(--color-text-muted);
      white-space: nowrap;
      text-decoration: none;

      &:hover {
        color: var(--color-text-sub);
        text-decoration: underline;
      }
    }

    .Bookmark-permalinkIcon {
      width: 1.2em;
      height: 1.2em;
    }

    .Bookmark-date {
      grid-column: 4 / 5;
      grid-row: 2 / 3;
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      color: var(--color-text-muted);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      text-decoration: none;

      &:hover {
        color: var(--color-text-sub);
        text-decoration: underline;
      }
    }
  }
</style>
