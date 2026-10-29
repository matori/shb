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

<style lang="scss" global>
  .EntryListItemBookmarkCount {
  }

  .EntryListItemBookmarkCount-button {
    @include text(1, false);
    @include spread-clickable-area(0, var(--color-text-red));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: $line-edge;
    color: var(--color-text-red);
    line-height: 1;
    white-space: nowrap;
  }

  .EntryListItemBookmarkCount-count {
    min-width: 4ch;
  }

  .EntryListItemBookmarkCount-suffix {
    @include text(-2, false);
  }
</style>
