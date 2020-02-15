<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import { entriesFetchProcessing, entriesData } from "~/store/entries"
  import Button from "~/elements/Button"
  import Icon from "~/elements/Icon"

  let heading
  export { heading }

  const removeAttrs = createNullValueObject(["heading"])

  function onClickSync(event) {
    entriesData.update()
  }
</script>

<template>
  <header {...$$props} {...removeAttrs} class="{$$props.class || ''} EntriesHeader">
    <h2 class="EntriesHeader-heading">{heading}</h2>
    <Button
      class="EntriesHeader-syncButton {$entriesFetchProcessing ? '_loading' : ''}"
      disabled="{$entriesFetchProcessing}"
      on:click="{onClickSync}"
    >
      <Icon name="sync" class="EntriesHeader-syncIcon" />
      更新
    </Button>
  </header>
</template>

<style lang="scss" global>
  .EntriesHeader {
    display: flex;
    justify-content: space-between;
    padding-right: get-lines(0.25);
    padding-left: get-lines(0.25);
  }

  .EntriesHeader-heading {
    @include text(-1);
    margin: 0;
    font-weight: var(--fw-normal);
    line-height: 1;
  }

  .EntriesHeader-syncButton {
    @include spread-clickable-area;
    @include text(-1);
    display: flex;
    align-items: center;
    position: relative;

    &:disabled {
      opacity: 0.8;
      cursor: not-allowed;

      &:hover {
        text-decoration: none;
      }
    }
  }

  .EntriesHeader-syncIcon {
    @include icon-size(-1);
    margin-right: 0.25em;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;

    .EntriesHeader-syncButton:disabled & {
      animation-name: syncing;
    }
  }


</style>
