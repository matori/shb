<script>
  import Link from "~/elements/Link"
  import Icon from "~/elements/Icon"

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
      color: var(--color-text-steel);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .BookmarksItemCommentPermalink-icon {
      width: 1.041667rem;
      height: 1.041667rem;
      margin-right: 0.25em;
    }

    .BookmarksItemCommentPermalink-label {
      white-space: nowrap;
    }
  }
</style>
