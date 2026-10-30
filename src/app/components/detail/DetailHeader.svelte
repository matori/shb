<script>
  import { entryDetail } from "~/store/entryDetail.svelte.js"
  import Button from "~/elements/Button.svelte"
  import Icon from "~/elements/Icon.svelte"

  let { heading, class: className = "", ...rest } = $props()
</script>

<header {...rest} class={[className, "DetailHeader"]}>
  <h2 class="DetailHeader-heading">
    {heading}
    <Icon name="refresh" class="DetailHeader-icon {entryDetail.isLoading ? '_show' : ''}" />
  </h2>
  <Button class="DetailHeader-closeButton" onclick={() => entryDetail.close()}>
    <Icon name="close" class="DetailHeader-closeIcon" />
    情報とコメントのパネルを閉じる
  </Button>
</header>

<style>
  :global {
    .DetailHeader {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: var(--radius-panel) var(--radius-panel) 0 0;
      padding: calc(var(--line) * 0.6) calc(var(--line) * 0.75) calc(var(--line) * 0.25);
      background-color: var(--color-surface);
    }

    .DetailHeader-heading {
      font-size: var(--fs-l);
      line-height: var(--lh-l);
      display: flex;
      align-items: center;
      margin: 0;
      font-weight: var(--fw-bold);
    }

    .DetailHeader-icon {
      width: calc(var(--fs-s) * var(--lh-s));
      height: calc(var(--fs-s) * var(--lh-s));
      margin-left: 0.4em;
      color: var(--color-text-muted);
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
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      display: flex;
      align-items: center;
      gap: 0.25em;
      border-radius: var(--radius-pill);
      padding: 0.15em 0.8em;
      color: var(--color-text-sub);

      &:hover {
        background-color: var(--color-surface-sub);
        color: var(--color-text);
      }
    }

    .DetailHeader-closeIcon {
      width: calc(var(--fs-s) * var(--lh-s));
      height: calc(var(--fs-s) * var(--lh-s));
    }
  }
</style>
