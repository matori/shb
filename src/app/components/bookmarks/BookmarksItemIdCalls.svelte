<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import Icon from "~/elements/Icon.svelte"
  import Link from "~/elements/Link.svelte"
  import List from "~/elements/List.svelte"
  import BookmarksItemContent from "~/components/bookmarks/BookmarksItemContent.svelte"
  import BookmarksItemAvatar from "~/components/bookmarks/BookmarksItemAvatar"

  let bookmark
  let eid
  export { bookmark, eid }

  const removeAttrs = createNullValueObject(["bookmark", "eid"])
</script>

<template>
  <dl class="BookmarksItemIdCalls">
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
                    user="{idcall.user}"
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
                <BookmarksItemContent bookmark="{idcall}" {eid} />
              {/if}
              {#if idcall.belowData}
                <div class="BookmarksItemIdCalls_below">
                  <dl class="BookmarksItemIdCalls">
                    <dt class="BookmarksItemIdCalls-title">下の階でのコメント</dt>
                    <dd class="BookmarksItemIdCalls-body">
                      <BookmarksItemContent
                        bookmark="{idcall.belowData}"
                        eid="{idcall.belowEid}"
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
          <BookmarksItemContent bookmark="{idcall}" {eid} class="BookmarksItemIdCalls-item" />
        {/each}
      </dd>
    {/if}
  </dl>
</template>

<style lang="scss" global>
  .BookmarksItemIdCalls {
    margin: 0;

    &._below {
    }
  }

  .BookmarksItemIdCalls-title {
    @include text(-1);
    display: flex;
    align-items: center;
    border-width: 1px 0;
    border-style: solid;
    border-color: var(--color-border-base);
    background-color: var(--color-bg-base);
    padding: get-lines(0.25) (get-lines(0.25) + $line-edge);
    line-height: 1;
  }

  .BookmarksItemIdCalls-icon {
    @include icon-size(-1);
    margin-right: 0.5em;
  }

  .BookmarksItemIdCalls-body {
    margin-left: 0;
  }

  .BookmarksItemIdCalls-list {
  }

  .BookmarksItemIdCalls-item {
    &:nth-last-child(n + 2) {
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-bottom-color: var(--color-border-base);
    }
  }

  .BookmarksItemIdCalls-message {
    @include text(-1);
    display: flex;
    align-items: flex-start;
    margin: 0;
    padding: (get-lines(0.5) - $line-edge) (get-lines(0.25) + $line-edge);
    opacity: 0.5;
  }

  .BookmarksItemIdCalls-avatar {
    margin-right: get-lines(0.5);
  }

  .BookmarksItemIdCalls-text {
  }

  .BookmarksItemIdCalls-link {
    color: var(--color-text-blue);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .BookmarksItemIdCalls_below {
    padding-left: calc(#{get-lines(0.25) + $line-edge} + 16px);
  }
</style>
