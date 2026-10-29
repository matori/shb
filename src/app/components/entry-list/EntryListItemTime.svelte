<script>
  import Time from "~/elements/Time"

  let { datetime, class: className = "", ...rest } = $props()
</script>

<span {...rest} class={[className, "EntryListItemTime"]}>
  <Time {datetime} class="EntryListItemTime-time" />
</span>

<style>
  :global {
    .EntryListItemTime {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: flex;
      align-items: center;
      color: var(--color-text-muted);
      font-variant-numeric: tabular-nums;
    }
  }
</style>
