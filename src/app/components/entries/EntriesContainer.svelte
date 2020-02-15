<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import CategoryTab from "~/components/entries/CategoryTab"
  import EntriesHeader from "~/components/entries/EntriesHeader"

  const removeAttrs = createNullValueObject([])
</script>

<template>
  <section {...$$props} {...removeAttrs} class="{$$props.class || ''} EntriesContainer">
    <EntriesHeader heading="エントリーの一覧" class="EntriesContainer-header" />
    <div class="EntriesContainer-entries">
      <CategoryTab class="EntriesContainer-content" />
    </div>
  </section>
</template>

<style lang="scss" global>
  .EntriesContainer {
    display: grid;
    grid-template-rows: min-content 1fr;
    row-gap: get-lines(0.5) - rem($config-line-gap / 2);
  }

  .EntriesContainer-header {
  }

  .EntriesContainer-entries {
    border-width: 1px;
    border-style: solid;
    border-color: var(--color-border-base);
    min-height: 0;
    box-shadow: var(--shadow-base);
    background-color: var(--color-bg-content);
  }

  .EntriesContainer-content {
  }
</style>
