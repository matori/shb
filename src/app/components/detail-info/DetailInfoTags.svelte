<script>
  import List from "~/elements/List.svelte"
  import Link from "~/elements/Link.svelte"
  import Icon from "~/elements/Icon.svelte"

  let { tags, class: className = "", ...rest } = $props()
</script>

<div {...rest} class={[className, "DetailInfoTags"]}>
  <div class="DetailInfoTags-prefix" aria-hidden="true">
    <Icon name="tag" class="DetailInfoTags-icon" />
  </div>
  <List class="DetailInfoTags-list" aria-label="このエントリーにつけられた主なタグ">
    {#each tags as tag}
      <li class="DetailInfoTags-item">
        <Link url={tag.url} class="DetailInfoTags-link">{tag.label}</Link>
      </li>
    {/each}
  </List>
</div>

<style>
  :global {
    .DetailInfoTags {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: flex;
      align-items: flex-start;
      gap: 0.4em;
      color: var(--color-text-muted);
    }

    .DetailInfoTags-prefix {
      flex-shrink: 0;
      padding-top: 0.2em;
      width: 1.1em;
      height: 1.1em;
    }

    .DetailInfoTags-icon {
      display: block;
      width: 100%;
      height: 100%;
    }

    .DetailInfoTags-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.3em;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .DetailInfoTags-link {
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
  }
</style>
