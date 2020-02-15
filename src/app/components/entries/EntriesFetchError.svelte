<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import FetchError from "~/components/common/FetchError"

  let display
  let when
  let message
  export { display, when, message }

  const removeAttrs = createNullValueObject(["display", "when", "message"])
</script>

<template>
  <FetchError
    {...$$props}
    {...removeAttrs}
    {display}
    {when}
    {message}
    class="{$$props.class || ''} EntriesFetchError"
  />
</template>

<style lang="scss" global>
  .EntriesFetchError {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--color-border-base);
    padding: get-lines(1);
  }
</style>
