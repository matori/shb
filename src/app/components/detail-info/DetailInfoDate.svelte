<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import Time from "~/elements/Time"

  let datetime
  export { datetime }

  const removeAttrs = createNullValueObject(["datetime"])
</script>

<template>
  <span {...$$props} {...removeAttrs} class="{$$props.class || ''} DetailInfoDate">
    <Time {datetime} title="最初にブックマークされた日時" class="DetailInfoDate-time" />
  </span>
</template>

<style lang="scss" global>
  .DetailInfoDate {
    @include text(-1);
    display: flex;
    align-items: center;
    padding-right: rem($config-line-gap / 2);
  }

  .DetailInfoDate-time {
    color: var(--color-text-gray);
  }
</style>
