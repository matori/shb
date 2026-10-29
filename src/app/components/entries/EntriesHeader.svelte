<script>
  import { entriesFetchProcessing, entriesData } from "~/store/entries"
  import Button from "~/elements/Button"
  import Icon from "~/elements/Icon"

  let { heading, class: className = "", ...rest } = $props()
</script>

<header {...rest} class={[className, "EntriesHeader"]}>
  <h2 class="EntriesHeader-heading">{heading}</h2>
  <Button
    class="EntriesHeader-syncButton {$entriesFetchProcessing ? '_loading' : ''}"
    disabled={$entriesFetchProcessing}
    onclick={() => entriesData.update()}
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
      justify-content: space-between;
      padding: calc(var(--line) * 0.6) calc(var(--line) * 0.75) calc(var(--line) * 0.4);
    }

    .EntriesHeader-heading {
      font-size: var(--fs-l);
      line-height: var(--lh-l);
      margin: 0;
      font-weight: var(--fw-bold);
    }

    .EntriesHeader-syncButton {
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
