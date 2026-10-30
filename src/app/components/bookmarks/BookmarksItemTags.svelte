<script>
  import Icon from "~/elements/Icon.svelte"
  import Link from "~/elements/Link.svelte"
  import List from "~/elements/List.svelte"

  let { user, tags = [], class: className = "", ...rest } = $props()

  const userTags = $derived(
    tags.map((tag) => ({
      label: tag,
      url: `https://b.hatena.ne.jp/${user}/${encodeURIComponent(tag)}/`,
    })),
  )
</script>

<div {...rest} class={[className, "BookmarksItemTags"]}>
  <div class="BookmarksItemTags-prefix">
    <Icon name="tag" class="BookmarksItemTags-icon" aria-hidden="true" />
  </div>
  <List class="BookmarksItemTags-list" aria-label="{user}がつけたタグ">
    {#each userTags as tag (tag.url)}
      <li class="BookmarksItemTags-item">
        <Link url={tag.url} class="BookmarksItemTags-link">{tag.label}</Link>
      </li>
    {/each}
  </List>
</div>

<style>
  :global {
    .BookmarksItemTags {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: flex;
      gap: 0.3em;
      color: var(--color-text-muted);
    }

    .BookmarksItemTags-prefix {
      flex-shrink: 0;
      padding-top: 0.15em;
      width: 1.1em;
      height: 1.1em;
    }

    .BookmarksItemTags-icon {
      display: block;
      width: 100%;
      height: 100%;
    }

    .BookmarksItemTags-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .BookmarksItemTags-item {
      display: inline;
      margin-right: 0.5em;
      word-break: break-word;
    }

    .BookmarksItemTags-link {
      color: inherit;
      text-decoration: none;

      &:hover {
        color: var(--color-text-sub);
        text-decoration: underline;
      }
    }
  }
</style>
