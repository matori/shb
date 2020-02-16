<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import Button from "~/elements/Button"

  let count
  export { count }

  const removeAttrs = createNullValueObject(["count"])

  $: countSuffix = count > 1 ? "users" : "user"
</script>

<template>
  <span  class="{$$props.class || ''} EntryListItemBookmarkCount">
    <Button {...$$props} {...removeAttrs} class="EntryListItemBookmarkCount-button" on:click>
      <span class="EntryListItemBookmarkCount-count">{count}</span>
      <span class="EntryListItemBookmarkCount-suffix">{countSuffix}</span>
    </Button>
  </span>
</template>

<style lang="scss" global>
  .EntryListItemBookmarkCount {
  }

  .EntryListItemBookmarkCount-button {
    @include text(1, false);
    @include spread-clickable-area(0, var(--color-text-red));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: $line-edge;
    color: var(--color-text-red);
    line-height: 1;
    white-space: nowrap;
  }

  .EntryListItemBookmarkCount-count {
    min-width: 4ch;
  }

  .EntryListItemBookmarkCount-suffix{
    @include text(-2, false);
  }
</style>
