<script>
  import Link from "~/elements/Link.svelte"
  import Icon from "~/elements/Icon.svelte"

  let { user, eid, class: className = "", ...rest } = $props()

  const url = $derived(`https://b.hatena.ne.jp/entry/${eid}/comment/${user}`)
</script>

<Link {...rest} {url} class={[className, "BookmarksItemCommentPermalink"]} title="コメントのパーマリンク">
  <Icon name="link" class="BookmarksItemCommentPermalink-icon" aria-hidden="true" />
  <span class="BookmarksItemCommentPermalink-label">Permalink</span>
</Link>

<style>
  :global {
    .BookmarksItemCommentPermalink {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: flex;
      align-items: center;
      gap: 0.25em;
      color: var(--color-text-muted);
      text-decoration: none;

      &:hover {
        color: var(--color-text-sub);
        text-decoration: underline;
      }
    }

    .BookmarksItemCommentPermalink-icon {
      width: 1.2em;
      height: 1.2em;
    }

    .BookmarksItemCommentPermalink-label {
      white-space: nowrap;
    }
  }
</style>
