<script>
  import Icon from "~/elements/Icon.svelte"
  import Link from "~/elements/Link.svelte"
  import List from "~/elements/List.svelte"
  import Bookmark from "~/components/bookmarks/Bookmark.svelte"
  import UserAvatar from "~/components/bookmarks/UserAvatar.svelte"

  // ブックマークのコメントでIDコールしたユーザーのブックマークと、このユーザーをIDコールしたブックマーク
  // IDコールしたユーザーが下の階にもブックマークしていれば、そのコメントも表示する
  let { bookmark, eid, class: className = "", ...rest } = $props()
</script>

<dl {...rest} class={[className, "IdCallRelations"]}>
  {#if bookmark.idCallsTo}
    <dt class="IdCallRelations-title">
      <Icon name="reply-to" class="IdCallRelations-icon" />
      IDコールした
    </dt>
    <dd class="IdCallRelations-body">
      <List class="IdCallRelations-list">
        {#each bookmark.idCallsTo as idCall (idCall.user)}
          <li class="IdCallRelations-item">
            {#if idCall.bookmark}
              <Bookmark bookmark={idCall.bookmark} {eid} />
            {:else}
              <p class="IdCallRelations-notBookmarked">
                <UserAvatar user={idCall.user} />
                <span>
                  <Link url="https://b.hatena.ne.jp/{idCall.user}/" class="IdCallRelations-user">id:{idCall.user}</Link>
                  はまだブックマークしていません
                </span>
              </p>
            {/if}
            {#if idCall.lowerFloorBookmark}
              <div class="IdCallRelations-lowerFloor">
                <dl class="IdCallRelations">
                  <dt class="IdCallRelations-title">下の階でのコメント</dt>
                  <dd class="IdCallRelations-body">
                    <Bookmark
                      bookmark={idCall.lowerFloorBookmark}
                      eid={idCall.lowerFloorEid}
                      class="IdCallRelations-item"
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
  {#if bookmark.idCalledBy}
    <dt class="IdCallRelations-title">
      <Icon name="reply" class="IdCallRelations-icon" />
      IDコールされた
    </dt>
    <dd class="IdCallRelations-body">
      {#each bookmark.idCalledBy as caller (caller.user)}
        <Bookmark bookmark={caller} {eid} class="IdCallRelations-item" />
      {/each}
    </dd>
  {/if}
</dl>

<style>
  :global {
    .IdCallRelations {
      margin: 0;
      border-radius: var(--radius-control);
      overflow: hidden;
      background-color: var(--color-surface-hover);
    }

    .IdCallRelations-title {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: flex;
      align-items: center;
      gap: 0.4em;
      padding: calc(var(--line) * 0.25) calc(var(--line) * 0.5);
      color: var(--color-text-sub);
      font-weight: var(--fw-bold);
    }

    .IdCallRelations-icon {
      width: 1.2em;
      height: 1.2em;
    }

    .IdCallRelations-body {
      margin-left: 0;
    }

    .IdCallRelations-item {
      border-top: 1px solid var(--color-line);
    }

    .IdCallRelations-notBookmarked {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      display: flex;
      align-items: flex-start;
      gap: calc(var(--line) * 0.5);
      margin: 0;
      padding: calc(var(--line) * 0.5) calc(var(--line) * 0.75);
      color: var(--color-text-muted);
    }

    .IdCallRelations-user {
      color: var(--color-text-sub);
      font-weight: var(--fw-bold);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .IdCallRelations-lowerFloor {
      padding: 0 calc(var(--line) * 0.5) calc(var(--line) * 0.5) calc(var(--line) * 0.75 + 32px);
    }
  }
</style>
