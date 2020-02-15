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
  <div class="{$$props.class || ''} DetailFetchError">
    <FetchError {...$$props} {...removeAttrs} {display} {when} {message} class="DetailFetchError-error" />
  </div>
</template>

<style lang="scss" global>
  .DetailFetchError {
    border-width: 1px;
    border-style: solid;
    border-color: var(--color-border-base);
    padding: get-lines(1);
    background-color: var(--color-bg-content);
    box-shadow: var(--box-shadow-base);
  }

  .DetailFetchError-error {
  }
</style>
