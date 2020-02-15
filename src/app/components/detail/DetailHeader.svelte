<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import { detailData, detailFetchProcessing } from "~/store/detail"
  import Button from "~/elements/Button"
  import Icon from "~/elements/Icon"

  let heading
  export { heading }

  const removeAttrs = createNullValueObject(["heading"])

  function onClickClose(event) {
    detailData.reset()
  }
</script>

<template>
  <header {...$$props} {...removeAttrs} class="{$$props.class || ''} DetailHeader">
    <h2 class="DetailHeader-heading">
      {heading}
      <Icon name="refresh" class="DetailHeader-icon {$detailFetchProcessing ? '_show' : ''}" />
    </h2>
    <Button class="DetailHeader-closeButton" on:click="{onClickClose}">
      <Icon name="close" class="DetailHeader-closeIcon" />
      情報とコメントのパネルを閉じる
    </Button>
  </header>
</template>

<style lang="scss" global>
  .DetailHeader {
    display: flex;
    justify-content: space-between;
    padding-right: get-lines(0.25);
    padding-left: get-lines(0.25);
  }

  .DetailHeader-heading {
    @include text(-1);
    display: flex;
    margin: 0;
    font-weight: var(--fw-normal);
  }

  .DetailHeader-icon {
    @include icon-size(-1);
    margin-left: 0.25em;
    opacity: 0;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;

    &._show {
      opacity: 1;
      animation-name: syncing;
    }
  }

  .DetailHeader-closeButton {
    @include spread-clickable-area;
    @include text(-1);
    display: flex;
    align-items: center;
    position: relative;
  }

  .DetailHeader-closeIcon {
    @include icon-size(-1);
    margin-right: 0.25em;
  }
</style>
