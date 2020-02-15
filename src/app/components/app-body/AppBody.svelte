<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import ContentContainer from "~/components/app-body/ContentContainer"

  const removeAttrs = createNullValueObject([])
</script>

<template>
  <div {...$$props} {...removeAttrs} class="{$$props.class || ''} AppBody">
    <ContentContainer class="AppBody-inner" />
  </div>
</template>

<style lang="scss" global>
  .AppBody {
    padding-right: get-lines(1);
    padding-bottom: get-lines(1);
    padding-left: get-lines(1);
  }

  .AppBody-inner {
    margin: auto;
    height: 100%;
    max-width: var(--content-max-width);
    min-width: var(--content-min-width);
  }
</style>
