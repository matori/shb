<script>
  import Button from "~/elements/Button"

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
    .EntryListItemBookmarkCount {
    }

    .EntryListItemBookmarkCount-button {
      font-size: var(--fs-l);
      &::before {
        position: absolute;
        inset: 0;
        content: "";
        box-shadow: 0 0 2px 1px var(--color-text-red);
        opacity: 0;
      }

      &:hover::before {
        opacity: 1;
      }
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      padding: var(--line-edge);
      color: var(--color-text-red);
      line-height: 1;
      white-space: nowrap;
    }

    .EntryListItemBookmarkCount-count {
      min-width: 4ch;
    }

    .EntryListItemBookmarkCount-suffix {
      font-size: var(--fs-xs);
    }
  }
</style>
