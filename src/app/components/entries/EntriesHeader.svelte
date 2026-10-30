<script>
  import entryTypes from "~/constants/entryTypes"
  import { entryFeeds } from "~/store/entryFeeds.svelte.js"
  import { viewState } from "~/store/viewState.svelte.js"
  import Button from "~/elements/Button.svelte"
  import Icon from "~/elements/Icon.svelte"

  let { heading, class: className = "", ...rest } = $props()
</script>

<header {...rest} class={[className, "EntriesHeader"]}>
  <h2 class="EntriesHeader-heading">{heading}</h2>
  <!-- 人気・新着はすべてのカテゴリーに共通なので、カテゴリーのタブより上に1つだけ置く -->
  <div class="EntriesHeader-types" role="group" aria-label="エントリーの種類">
    {#each entryTypes as type, index (type.key)}
      <Button
        class="EntriesHeader-type"
        aria-pressed={viewState.selectedEntryTypeIndex === index}
        onclick={() => (viewState.selectedEntryTypeIndex = index)}
      >
        {type.label}
      </Button>
    {/each}
  </div>
  <Button
    class="EntriesHeader-syncButton {entryFeeds.isLoading ? '_loading' : ''}"
    disabled={entryFeeds.isLoading}
    onclick={() => entryFeeds.load()}
  >
    <Icon name="sync" class="EntriesHeader-syncIcon" />
    更新
  </Button>
</header>

<style>
  :global {
    .EntriesHeader {
      display: flex;
      align-items: center;
      gap: calc(var(--line) * 0.5);
      padding: calc(var(--line) * 0.6) calc(var(--line) * 0.75) calc(var(--line) * 0.4);
    }

    .EntriesHeader-heading {
      font-size: var(--fs-l);
      line-height: var(--lh-l);
      margin: 0;
      font-weight: var(--fw-bold);
    }

    .EntriesHeader-types {
      display: inline-flex;
      gap: 2px;
      border-radius: var(--radius-pill);
      padding: 3px;
      background-color: var(--color-surface-sub);
    }

    .EntriesHeader-type {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      border-radius: var(--radius-pill);
      padding: 0.1em 1.4em;
      color: var(--color-text-sub);
      white-space: nowrap;

      &:hover {
        color: var(--color-text);
      }

      &[aria-pressed="true"] {
        background-color: var(--color-surface);
        color: var(--color-text);
        font-weight: var(--fw-bold);
        box-shadow: var(--shadow-selected);
      }
    }

    .EntriesHeader-syncButton {
      margin-left: auto;
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      display: flex;
      align-items: center;
      gap: 0.25em;
      border-radius: var(--radius-pill);
      padding: 0.15em 0.8em;
      color: var(--color-accent);
      font-weight: var(--fw-medium);

      &:hover {
        background-color: var(--color-surface-sub);
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;

        &:hover {
          background-color: transparent;
        }
      }
    }

    .EntriesHeader-syncIcon {
      width: calc(var(--fs-s) * var(--lh-s));
      height: calc(var(--fs-s) * var(--lh-s));
      animation-duration: 1s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;

      .EntriesHeader-syncButton:disabled & {
        animation-name: syncing;
      }
    }
  }
</style>
