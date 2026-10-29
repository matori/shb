<script>
  import { detailData, detailFetchProcessing } from "~/store/detail"
  import Button from "~/elements/Button"
  import Icon from "~/elements/Icon"

  let { heading, class: className = "", ...rest } = $props()
</script>

<header {...rest} class={[className, "DetailHeader"]}>
  <h2 class="DetailHeader-heading">
    {heading}
    <Icon name="refresh" class="DetailHeader-icon {$detailFetchProcessing ? '_show' : ''}" />
  </h2>
  <Button class="DetailHeader-closeButton" onclick={() => detailData.reset()}>
    <Icon name="close" class="DetailHeader-closeIcon" />
    情報とコメントのパネルを閉じる
  </Button>
</header>

<style>
  :global {
    .DetailHeader {
      display: flex;
      justify-content: space-between;
      padding-right: calc(var(--line) * 0.25);
      padding-left: calc(var(--line) * 0.25);
    }

    .DetailHeader-heading {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      display: flex;
      margin: 0;
      font-weight: var(--fw-normal);
    }

    .DetailHeader-icon {
      width: calc(var(--fs-s) * var(--lh-s));
      height: calc(var(--fs-s) * var(--lh-s));
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
    }

    .DetailHeader-closeIcon {
      width: calc(var(--fs-s) * var(--lh-s));
      height: calc(var(--fs-s) * var(--lh-s));
      margin-right: 0.25em;
    }
  }
</style>
