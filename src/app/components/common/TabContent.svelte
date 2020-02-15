<script>
  import { createEventDispatcher } from "svelte"
  import { uniqueId } from "lodash"
  import KEY_NAMES from "~/constants/keyNames"
  import createNullValueObject from "~/utils/createNullValueObject"
  import Button from "~/elements/Button.svelte"

  // props
  let tabs
  let selected = 0
  let label
  let labelledby
  let panelTabIndex = false
  export { tabs, selected, label, labelledby, panelTabIndex }

  const removeAttrs = createNullValueObject(["tabs", "selected", "label", "labelledby", "panelTabIndex"])

  // このコンポーネントが呼び出されるたびにタブとタブパネルにつける新しいidをつける必要があるので
  // LodashのuniqueIdを使ってidがかぶらないようにする
  const uid = uniqueId("tabContent-")

  const dispatch = createEventDispatcher()

  // タブがクリックされたら `click:tab` イベントをディスパッチして「このコンポーネントを使う側」で処理する
  // このタブコンテンツコンポーネント単体で関係するならここで処理してもよいが、
  // タブコンテンツごとのstoreにアクティブなタブのindexを格納するので
  // アクティブなタブを指定するのは「このコンポーネントを使う側」で行う
  function onClickTab(index) {
    dispatch("click:tab", {
      index,
    })
  }

  // タブ上で特定のキーが押されたら `keydown:{keyname}` イベントをディスパッチして「このコンポーネントを使う側」で処理する
  // 上にある click:tab と同じ事情
  function onKeydownTab(event) {
    if (event.altKey || event.metaKey || event.ctrlKey) {
      return
    }
    const key = event.key
    switch (key) {
      case KEY_NAMES.left:
        dispatch("keydown:left", {
          items: event.target.parentElement.parentElement.children,
        })
        break
      case KEY_NAMES.right:
        dispatch("keydown:right", {
          items: event.target.parentElement.parentElement.children,
        })
        break
    }
  }

  function focusTab(node, selected) {
    return {
      update(selected) {
        dispatch("update:selected", {
          selected,
          items: node.children,
        })
      },
    }
  }
</script>

<template>
  <div {...$$props} {...removeAttrs} class="{$$props.class || ''} TabContent">
    <ol
      class="TabContent-tabList"
      role="tablist"
      aria-label="{labelledby ? null : label || null}"
      aria-labelledby="{labelledby || null}"
      use:focusTab="{selected}"
    >
      {#each tabs as { key, label, display }, index}
        <li class="TabContent-tabItem" role="none">
          <Button
            id="{uid}-tab-{index}"
            class="TabContent-tab _{key}"
            tabindex="{selected === index ? null : -1}"
            role="tab"
            aria-label="{display ? label : null}"
            aria-controls="{uid}-tabpanel-{index}"
            aria-selected="{selected === index}"
            on:click="{onClickTab.bind(null, index)}"
            on:keydown="{onKeydownTab}"
          >
            {@html display || label}
          </Button>
        </li>
      {/each}
    </ol>
    <div class="TabContent-body">
      {#each tabs as { key, label }, index}
        <div
          id="{uid}-tabpanel-{index}"
          class="TabContent-panel"
          tabindex="{panelTabIndex ? 0 : null}"
          role="tabpanel"
          aria-labelledby="{uid}-tab-{index}"
          aria-hidden="{selected !== index ? true : null}"
        >
          <slot {key} {label} />
        </div>
      {/each}
    </div>
  </div>
</template>

<style lang="scss" global>
  .TabContent {
    --tab-border-color: var(--color-border-base);
    display: grid;
    grid-template-rows: min-content 1fr;
    width: 100%;
    height: 100%;
    /*min-height: 0;*/
  }

  .TabContent-tabList {
    display: flex;
    margin: 0;
    padding-left: 0;
    list-style-type: none;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--tab-border-color);
  }

  .TabContent-tabItem {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: fit-content;
  }

  .TabContent-tab {
    @include text(-2);
    display: block;
    position: relative;
    padding: get-lines(0.5) get-lines(0.25);
    width: 100%;
    height: 100%;
    white-space: nowrap;

    &::after {
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      content: "";
      opacity: 0;
    }

    &:not([aria-selected="true"]):hover::after {
      border-width: 0 5px 5px;
      border-style: solid;
      border-color: transparent transparent var(--tab-border-color);
      margin-right: auto;
      margin-left: auto;
      width: 0;
      opacity: 1;
    }

    &[aria-selected="true"]::after {
      border-top-width: 4px;
      border-top-style: solid;
      border-top-color: var(--tab-border-color);
      width: 100%;
      opacity: 1;
    }

    font-feature-settings: "palt";

    &._fun,
    &._entertainment {
      @media screen and (min-width: 1141px) {
        wbr {
          display: none;
        }
      }
    }
  }

  .TabContent-body {
    min-height: 0;
  }

  .TabContent-panel {
    @include focus-clear-without-keyboard;
    height: 100%;

    &[aria-hidden="true"] {
      display: none;
    }
  }
</style>
