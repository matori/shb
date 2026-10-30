<script>
  import Button from "~/elements/Button.svelte"

  // WAI-ARIA のタブ。左右の矢印キーで前後のタブ（端まで行くと反対の端）、Home・End キーで最初・最後のタブに移る
  // 選択中のタブは使う側の状態で持つので、タブが選ばれたら onselect で index を渡し、selected で受け取る
  // - tabs: { key, label, labelSegments } の配列。labelSegments があれば、その区切りで改行できるようにする
  // - label: タブの並び全体のラベル
  let { tabs, selected = 0, label, tabListClass = "", onselect, class: className = "", children, ...rest } = $props()

  // このコンポーネントを使うたびに、タブとパネルの id がかぶらないようにする
  const id = $props.id()

  let tabElements = $state([])

  function select(index, { focus = false } = {}) {
    onselect?.(index)
    if (focus) {
      tabElements[index].focus()
    }
  }

  function onKeydownTab(event) {
    if (event.altKey || event.metaKey || event.ctrlKey) {
      return
    }
    const lastIndex = tabs.length - 1
    const nextIndex = {
      ArrowLeft: selected === 0 ? lastIndex : selected - 1,
      ArrowRight: selected === lastIndex ? 0 : selected + 1,
      Home: 0,
      End: lastIndex,
    }[event.key]
    if (nextIndex === undefined) {
      return
    }
    event.preventDefault()
    select(nextIndex, { focus: true })
  }
</script>

<div {...rest} class={[className, "Tabs"]}>
  <ol class={["Tabs-tabList", tabListClass]} role="tablist" aria-label={label}>
    {#each tabs as { key, label, labelSegments }, index (key)}
      <li class="Tabs-tabItem" role="none">
        <Button
          id="{id}-tab-{index}"
          class="Tabs-tab"
          tabindex={selected === index ? null : -1}
          role="tab"
          aria-controls="{id}-panel-{index}"
          aria-selected={selected === index}
          bind:ref={tabElements[index]}
          onclick={() => select(index)}
          onkeydown={onKeydownTab}
        >
          {#each labelSegments ?? [label] as segment, segmentIndex (segmentIndex)}
            {#if segmentIndex > 0}<wbr />{/if}{segment}
          {/each}
        </Button>
      </li>
    {/each}
  </ol>
  <div class="Tabs-body">
    {#each tabs as { key, label }, index (key)}
      <div
        id="{id}-panel-{index}"
        class="Tabs-panel"
        role="tabpanel"
        aria-labelledby="{id}-tab-{index}"
        hidden={selected !== index}
      >
        {@render children?.({ key, label })}
      </div>
    {/each}
  </div>
</div>

<style>
  :global {
    /* タブの見た目は、使う側（カテゴリー・階）で決める。ここでは両端が丸い形を基本にする */
    .Tabs {
      display: grid;
      grid-template-rows: min-content 1fr;
      width: 100%;
      height: 100%;
    }

    .Tabs-tabList {
      display: flex;
      gap: calc(var(--line) * 0.25);
      margin: 0;
      padding: 0;
      list-style-type: none;
    }

    .Tabs-tabItem {
      flex: none;
    }

    .Tabs-tab {
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

    .Tabs-body {
      min-height: 0;
    }

    .Tabs-panel {
      height: 100%;
    }
  }
</style>
