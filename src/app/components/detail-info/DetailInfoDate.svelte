<script>
  import Time from "~/elements/Time"

  let { datetime, class: className = "", ...rest } = $props()
</script>

<span {...rest} class={[className, "DetailInfoDate"]}>
  <Time {datetime} title="最初にブックマークされた日時" class="DetailInfoDate-time" />
</span>

<style>
  :global {
    .DetailInfoDate {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      color: var(--color-text-muted);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
  }
</style>
