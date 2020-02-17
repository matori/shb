<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import { links } from "~/store/config"
  import Link from "~/elements/Link.svelte"
  import List from "~/elements/List.svelte"

  const removeAttrs = createNullValueObject([])
</script>

<template>
  <div {...$$props} {...removeAttrs} class="{$$props.class || ''} AppFavLinks" aria-label="お気に入りリンク">
    {#if $links.length}
      <List class="AppFavLinks-list">
        {#each $links as link}
          <li class="AppFavLinks-item">
            <Link url="{link.url}" class="AppFavLinks-link">
              <img src="https://www.google.com/s2/favicons?domain={link.url}" alt="" class="AppFavLinks-favicon" />
              <span class="AppFavLinks-label">{link.label}</span>
            </Link>
          </li>
        {/each}
      </List>
    {/if}
  </div>
</template>

<style lang="scss" global>
  .AppFavLinks {
  }

  .AppFavLinks-list {
    display: flex;
    height: 100%;
    max-width: 100%;
  }

  .AppFavLinks-item {
    display: flex;
    position: relative;
    padding-right: 1px;
    min-width: calc(#{get-lines(0.5)} + 16px);

    &::after {
      position: absolute;
      top: get-lines(0.25);
      right: 0;
      bottom: get-lines(0.25);
      border-left-width: 1px;
      border-left-style: solid;
      border-left-color: var(--color-border-base);
      width: 0;
      content: "";
    }

    &:first-child {
      padding-left: 1px;

      &::before {
        position: absolute;
        top: get-lines(0.25);
        bottom: get-lines(0.25);
        left: 0;
        border-left-width: 1px;
        border-left-style: solid;
        border-left-color: var(--color-border-base);
        width: 0;
        content: "";
      }
    }
  }

  .AppFavLinks-link {
    @include text(-1);
    display: flex;
    align-items: center;
    padding-right: get-lines(0.5);
    padding-left: get-lines(0.5);
    height: 100%;
    overflow: hidden;
    color: var(--color-text-steel);
    white-space: nowrap;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .AppFavLinks-favicon {
    flex-grow: 0;
    flex-shrink: 0;
    margin-right: 0.25em;
    width: 16px;
    height: 16px;
  }

  .AppFavLinks-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
