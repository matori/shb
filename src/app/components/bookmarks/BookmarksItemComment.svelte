<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import Link from "~/elements/Link"

  let commentTexts
  export { commentTexts }

  const removeAttrs = createNullValueObject(["commentTexts"])
</script>

<template>
  <p {...$$props} {...removeAttrs} class="{$$props.class || ''} BookmarksItemComment">
    {#each commentTexts as text}
      {#if text.type === 'url'}
        <Link url="{text.text}" class="BookmarksItemComment-link">{text.text}</Link>
      {:else if text.type === 'entryEid'}
        <Link url="https://b.hatena.ne.jp/entry/{text.eid}" class="BookmarksItemComment-link">{text.text}</Link>
      {:else if text.type === 'idCall'}
        <Link url="https://b.hatena.ne.jp/{text.user}" class="BookmarksItemComment-link">{text.text}</Link>
      {:else}{text.text}{/if}
    {/each}
  </p>
</template>

<style lang="scss" global>
  .BookmarksItemComment {
    margin: 0;
  }

  .BookmarksItemComment-link {
    color: var(--color-text-blue);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
