<script>
  import Time from "~/elements/Time"

  let { datetime, class: className = "", ...rest } = $props()
</script>

<span {...rest} class={[className, "EntryListItemTime"]}>
  <Time {datetime} class="EntryListItemTime-time" />
</span>

<style lang="scss" global>
  .EntryListItemTime {
    @include text(-2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }

  .EntryListItemTime-time {
    color: var(--color-text-gray);
  }
</style>
