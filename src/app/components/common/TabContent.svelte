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
    panelClass = "",
    tabListClass = "",
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
    class={["TabContent-tabList", tabListClass]}
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
        class={["TabContent-panel", panelClass]}
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

<style>
  :global {
    /* タブの見た目は、使う側（カテゴリー・種類・階）で決める。ここでは両端が丸い形を基本にする */
    .TabContent {
      display: grid;
      grid-template-rows: min-content 1fr;
      width: 100%;
      height: 100%;
    }

    .TabContent-tabList {
      display: flex;
      gap: calc(var(--line) * 0.25);
      margin: 0;
      padding: 0;
      list-style-type: none;
    }

    .TabContent-tabItem {
      flex: none;
    }

    .TabContent-tab {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      display: block;
      border-radius: var(--radius-pill);
      padding: 0.15em 0.9em;
      background-color: var(--color-surface-sub);
      color: var(--color-text-sub);
      white-space: nowrap;
      font-feature-settings: "palt";

      &:hover {
        background-color: var(--color-line-strong);
        color: var(--color-text);
      }

      &[aria-selected="true"] {
        background-color: var(--color-accent);
        color: var(--color-on-accent);
        font-weight: var(--fw-medium);
      }
    }

    .TabContent-body {
      min-height: 0;
    }

    .TabContent-panel {
      height: 100%;

      &:focus:not(:focus-visible) {
        outline: none;
      }

      &[aria-hidden="true"] {
        display: none;
      }
    }
  }
</style>
