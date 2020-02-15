<script>
  import dayjs from "dayjs"
  import createNullValueObject from "~/utils/createNullValueObject"

  // props
  let datetime
  let needSeconds = true
  export { datetime, needSeconds }

  const removeAttrs = createNullValueObject(["datetime", "needSeconds"])

  $: format = needSeconds ? "YYYY/MM/DD HH:mm:ss" : "YYYY/MM/DD HH:mm"
  $: day = dayjs(datetime)
  $: ISO = day.toISOString()
  $: formatted = day.format(format)
</script>

<template>
  <time {...$$props} {...removeAttrs} datetime="{ISO}" class="{$$props.class || ''} Time">{formatted}</time>
</template>

<style lang="scss" global>
  .Time {
    white-space: nowrap;
  }
</style>
