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
      display: flex;
      align-items: flex-end;
      padding-right: var(--line-edge);
    }

    .DetailInfoDate-time {
      color: var(--color-text-gray);
    }
  }
</style>
