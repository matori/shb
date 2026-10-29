<script>
  import KEY_NAMES from "~/constants/keyNames"
  import { increment, decrement } from "~/utils/arrayIndex"
  import Button from "~/elements/Button.svelte"

  let {
    tabs,
    selected = 0,
    label,
    labelledby,
    panelTabIndex = false,
    onselect,
    class: className = "",
    children,
    ...rest
  } = $props()

  // このコンポーネントが呼び出されるたびにタブとタブパネルにつける新しいidが必要なので、
  // $props.id() でidがかぶらないようにする
  const uid = $props.id()

  const tabElements = []

  // タブが選択されたら onselect で「このコンポーネントを使う側」にindexを渡して処理する
  // タブコンテンツごとのstoreにアクティブなタブのindexを格納するので、
  // アクティブなタブを指定するのは「このコンポーネントを使う側」で行う
  function select(index, focus = false) {
    onselect?.(index)
    if (focus) {
      tabElements[index].focus()
    }
  }

  function onKeydownTab(event) {
    if (event.altKey || event.metaKey || event.ctrlKey) {
      return
    }
    switch (event.key) {
      case KEY_NAMES.left:
        select(decrement(selected, tabs.length, true), true)
        break
      case KEY_NAMES.right:
        select(increment(selected, tabs.length, true), true)
        break
    }
  }
</script>

<div {...rest} class={[className, "TabContent"]}>
  <ol
    class="TabContent-tabList"
    role="tablist"
    aria-label={labelledby ? null : label || null}
    aria-labelledby={labelledby || null}
  >
    {#each tabs as { key, label, display }, index}
      <li class="TabContent-tabItem" role="none">
        <Button
          id="{uid}-tab-{index}"
          class="TabContent-tab _{key}"
          tabindex={selected === index ? null : -1}
          role="tab"
          aria-label={display ? label : null}
          aria-controls="{uid}-tabpanel-{index}"
          aria-selected={selected === index}
          bind:ref={tabElements[index]}
          onclick={() => select(index)}
          onkeydown={onKeydownTab}
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
        tabindex={panelTabIndex ? 0 : null}
        role="tabpanel"
        aria-labelledby="{uid}-tab-{index}"
        aria-hidden={selected !== index ? true : null}
      >
        {@render children?.({ key, label })}
      </div>
    {/each}
  </div>
</div>

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
