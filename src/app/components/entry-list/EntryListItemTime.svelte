<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import Time from "~/elements/Time"

  let datetime
  export { datetime }

  const removeAttrs = createNullValueObject(["datetime"])
</script>

<template>
  <span {...$$props} {...removeAttrs} class="{$$props.class || ''} EntryListItemTime">
    <Time {datetime} class="EntryListItemTime-time" />
  </span>
</template>

<style lang="scss" global>
  .EntryListItemTime {
    @include text(-1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }

  .EntryListItemTime-time {
    color: var(--color-text-gray);
  }
</style>
