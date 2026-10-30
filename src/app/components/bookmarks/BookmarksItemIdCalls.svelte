<script>
  import Icon from "~/elements/Icon.svelte"
  import Link from "~/elements/Link.svelte"
  import List from "~/elements/List.svelte"
  import BookmarksItemContent from "~/components/bookmarks/BookmarksItemContent.svelte"
  import BookmarksItemAvatar from "~/components/bookmarks/BookmarksItemAvatar.svelte"

  let { bookmark, eid, class: className = "", ...rest } = $props()
</script>

<dl {...rest} class={[className, "BookmarksItemIdCalls"]}>
  {#if bookmark.idCalls}
    <dt class="BookmarksItemIdCalls-title">
      <Icon name="reply-to" class="BookmarksItemIdCalls-icon" />
      IDコールした
    </dt>
    <dd class="BookmarksItemIdCalls-body">
      <List class="BookmarksItemIdCalls-list">
        {#each bookmark.idCalls as idcall, index (idcall.user)}
          <li class="BookmarksItemIdCalls-item">
            {#if idcall.hasBookmark === false}
              <p class="BookmarksItemIdCalls-message">
                <BookmarksItemAvatar
                  user={idcall.user}
                  url="https://b.hatena.ne.jp/{idcall.user}/"
                  class="BookmarksItemIdCalls-avatar"
                />
                <span class="BookmarksItemIdCalls-text">
                  <Link url="https://b.hatena.ne.jp/{idcall.user}/" class="BookmarksItemIdCalls-link">
                    id:{idcall.user}
                  </Link>
                  はまだブックマークしていません
                </span>
              </p>
            {:else}
              <BookmarksItemContent bookmark={idcall} {eid} />
            {/if}
            {#if idcall.belowData}
              <div class="BookmarksItemIdCalls_below">
                <dl class="BookmarksItemIdCalls">
                  <dt class="BookmarksItemIdCalls-title">下の階でのコメント</dt>
                  <dd class="BookmarksItemIdCalls-body">
                    <BookmarksItemContent
                      bookmark={idcall.belowData}
                      eid={idcall.belowEid}
                      class="BookmarksItemIdCalls-item"
                    />
                  </dd>
                </dl>
              </div>
            {/if}
          </li>
        {/each}
      </List>
    </dd>
  {/if}
  {#if bookmark.idCalled}
    <dt class="BookmarksItemIdCalls-title">
      <Icon name="reply" class="BookmarksItemIdCalls-icon" />
      IDコールされた
    </dt>
    <dd class="BookmarksItemIdCalls-body">
      {#each bookmark.idCalled as idcall, index (idcall.user)}
        <BookmarksItemContent bookmark={idcall} {eid} class="BookmarksItemIdCalls-item" />
      {/each}
    </dd>
  {/if}
</dl>

<style>
  :global {
    .BookmarksItemIdCalls {
      margin: 0;
      border-radius: var(--radius-control);
      overflow: hidden;
      background-color: var(--color-surface-hover);
    }

    .BookmarksItemIdCalls-title {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: flex;
      align-items: center;
      gap: 0.4em;
      padding: calc(var(--line) * 0.25) calc(var(--line) * 0.5);
      color: var(--color-text-sub);
      font-weight: var(--fw-bold);
    }

    .BookmarksItemIdCalls-icon {
      width: 1.2em;
      height: 1.2em;
    }

    .BookmarksItemIdCalls-body {
      margin-left: 0;
    }

    .BookmarksItemIdCalls-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .BookmarksItemIdCalls-item {
      border-top: 1px solid var(--color-line);
    }

    .BookmarksItemIdCalls-message {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      display: flex;
      align-items: flex-start;
      gap: calc(var(--line) * 0.5);
      margin: 0;
      padding: calc(var(--line) * 0.5) calc(var(--line) * 0.75);
      color: var(--color-text-muted);
    }

    .BookmarksItemIdCalls-link {
      color: var(--color-text-sub);
      font-weight: var(--fw-bold);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .BookmarksItemIdCalls_below {
      padding: 0 calc(var(--line) * 0.5) calc(var(--line) * 0.5) calc(var(--line) * 0.75 + 32px);
    }
  }
</style>
