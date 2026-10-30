<script>
  import Button from "~/elements/Button.svelte"

  let { count, class: className = "", ...rest } = $props()

  const countSuffix = $derived(count > 1 ? "users" : "user")
</script>

<span class={[className, "EntryListItemBookmarkCount"]}>
  <Button {...rest} class="EntryListItemBookmarkCount-button">
    <span class="EntryListItemBookmarkCount-count">{count}</span>
    <span class="EntryListItemBookmarkCount-suffix">{countSuffix}</span>
  </Button>
</span>

<style>
  :global {
    .EntryListItemBookmarkCount-button {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      display: block;
      border-radius: var(--radius-pill);
      padding: 0.1em 0;
      width: 100%;
      background-color: var(--color-count-bg);
      color: var(--color-count);
      font-weight: var(--fw-bold);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;

      &:hover {
        background-color: var(--color-count);
        color: var(--color-on-accent);
      }
    }

    /* 「users」は読み上げ用に残し、見た目は数字だけにする */
    .EntryListItemBookmarkCount-suffix {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      clip: rect(0 0 0 0);
      overflow: hidden;
    }
  }
</style>
