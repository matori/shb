<script>
  import dayjs from "dayjs"

  let { datetime, needSeconds = true, class: className = "", ...rest } = $props()

  const day = $derived(dayjs(datetime))
  const formatted = $derived(day.format(needSeconds ? "YYYY/MM/DD HH:mm:ss" : "YYYY/MM/DD HH:mm"))
</script>

<time {...rest} datetime={day.toISOString()} class={[className, "Time"]}>{formatted}</time>

<style>
  :global {
    .Time {
      white-space: nowrap;
    }
  }
</style>
