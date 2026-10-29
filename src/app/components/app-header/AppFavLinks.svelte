<script>
  import { links } from "~/store/config"
  import Link from "~/elements/Link.svelte"
  import List from "~/elements/List.svelte"

  let { class: className = "", ...rest } = $props()
</script>

<div {...rest} class={[className, "AppFavLinks"]} aria-label="お気に入りリンク">
  {#if $links.length}
    <List class="AppFavLinks-list">
      {#each $links as link}
        <li class="AppFavLinks-item">
          <Link url={link.url} class="AppFavLinks-link">
            <img src="https://www.google.com/s2/favicons?domain={link.url}" alt="" class="AppFavLinks-favicon" />
            <span class="AppFavLinks-label">{link.label}</span>
          </Link>
        </li>
      {/each}
    </List>
  {/if}
</div>

<style>
  :global {
    .AppFavLinks-list {
      display: flex;
      gap: calc(var(--line) * 0.25);
      margin: 0;
      padding: 0;
      max-width: 100%;
      list-style: none;
    }

    .AppFavLinks-item {
      display: flex;
      min-width: 0;
    }

    .AppFavLinks-link {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      display: flex;
      align-items: center;
      gap: 0.4em;
      border-radius: var(--radius-pill);
      padding: 0.2em 0.9em;
      overflow: hidden;
      background-color: var(--color-surface-sub);
      color: var(--color-text);
      white-space: nowrap;
      text-decoration: none;

      &:hover {
        background-color: var(--color-line-strong);
        color: var(--color-text);
      }
    }

    .AppFavLinks-favicon {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
    }

    .AppFavLinks-label {
      overflow: hidden;
      text-overflow: ellipsis;

      &:empty {
        display: none;
      }
    }
  }
</style>
