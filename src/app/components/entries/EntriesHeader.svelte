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
      justify-content: space-between;
      padding-right: calc(var(--line) * 0.25);
      padding-left: calc(var(--line) * 0.25);
    }

    .EntriesHeader-heading {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      margin: 0;
      font-weight: var(--fw-normal);
      line-height: 1;
    }

    .EntriesHeader-syncButton {
      &::before {
        position: absolute;
        inset: calc(var(--line-edge) * -1);
        content: "";
        box-shadow: 0 0 2px 1px var(--color-text-blue);
        opacity: 0;
      }

      &:hover::before {
        opacity: 1;
      }
      font-size: var(--fs-s);
      line-height: var(--lh-s);
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
      width: calc(var(--fs-s) * var(--lh-s));
      height: calc(var(--fs-s) * var(--lh-s));
      margin-right: 0.25em;
      animation-duration: 1s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;

      .EntriesHeader-syncButton:disabled & {
        animation-name: syncing;
      }
    }
  }
</style>
