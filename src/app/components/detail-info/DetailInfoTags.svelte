<script>
  import List from "~/elements/List"
  import Link from "~/elements/Link"
  import Icon from "~/elements/Icon"

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
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      display: flex;
      align-items: flex-start;
      overflow: hidden;
      color: var(--color-text-gray);
    }

    .DetailInfoTags-prefix {
      flex-grow: 0;
      flex-shrink: 0;
      padding-top: var(--line-edge);
      padding-bottom: var(--line-edge);
      width: 1em;
      height: 1em;
    }

    .DetailInfoTags-icon {
      display: block;
      width: 100%;
      height: 100%;
    }

    .DetailInfoTags-list {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
    }

    .DetailInfoTags-item {
      margin-left: 0.5em;
    }

    .DetailInfoTags-link {
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
