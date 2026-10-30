<script>
  import dayjs from "dayjs"

  let { datetime, showSeconds = true, class: className = "", ...rest } = $props()

  const day = $derived(dayjs(datetime))
  const formatted = $derived(day.format(showSeconds ? "YYYY/MM/DD HH:mm:ss" : "YYYY/MM/DD HH:mm"))
</script>

<time {...rest} datetime={day.toISOString()} class={[className, "Time"]}>{formatted}</time>

<style>
  :global {
    .Time {
      white-space: nowrap;
    }
  }
</style>
