<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import { showAllBookmarks, reverseOrderBookmarks } from "~/store/ui"
  import Button from "~/elements/Button"
  import Icon from "~/elements/Icon"

  let heading
  export { heading }

  const removeAttrs = createNullValueObject(["heading"])

  let showAll
  let reverse

  showAllBookmarks.subscribe(value => {
    showAll = value
  })

  reverseOrderBookmarks.subscribe(value => {
    reverse = value
  })

  function onClickShowAllBookmarksButton(event) {
    showAllBookmarks.set(!showAll)
  }

  function onClickReverseOrderButton(event) {
    reverseOrderBookmarks.set(!reverse)
  }
</script>

<template>
  <header {...$$props} {...removeAttrs} class="{$$props.class || ''} BookmarksContainerHeader">
    <h3 class="BookmarksContainerHeader-heading">{heading}</h3>
    <div class="BookmarksContainerHeader-tools">
      <Button
        title="コメントのないブックマークも表示する"
        class="BookmarksContainerHeader-button _filter"
        role="switch"
        aria-checked="{showAll}"
        on:click="{onClickShowAllBookmarksButton}"
      >
        <Icon name="checkbox-checked" class="BookmarksContainerHeader-icon {showAll ? '_show' : '_hide'}" />
        <Icon name="checkbox-outline" class="BookmarksContainerHeader-icon {showAll ? '_hide' : '_show'}" />
        全ブックマーク表示
      </Button>
      <Button
        title="ブックマーク日時が古い順に並び替える"
        class="BookmarksContainerHeader-button _sort"
        role="switch"
        aria-checked="{reverse}"
        on:click="{onClickReverseOrderButton}"
      >
        <Icon
          name="checkbox-checked"
          class="BookmarksContainerHeader-icon {reverse ? '_show' : '_hide'}"
        />
        <Icon
          name="checkbox-outline"
          class="BookmarksContainerHeader-icon {reverse ? '_hide' : '_show'}"
        />
        古い順で表示
      </Button>
    </div>
  </header>
</template>

<style lang="scss" global>
  .BookmarksContainerHeader {
    display: flex;
    justify-content: space-between;
    padding-right: get-lines(0.25);
    padding-left: get-lines(0.25);
  }

  .BookmarksContainerHeader-heading {
    @include text(-1);
    margin: 0;
    font-weight: var(--fw-normal);
  }

  .BookmarksContainerHeader-tools {
    display: flex;
  }

  .BookmarksContainerHeader-button {
    @include spread-clickable-area;
    @include text(-1);
    display: flex;
    align-items: center;
    position: relative;

    &._sort {
      margin-left: 1em;
    }
  }

  .BookmarksContainerHeader-icon {
    @include icon-size(-1);
    margin-right: 0.25em;

    &._show {
      display: block;
    }

    &._hide {
      display: none;
    }
  }
</style>
