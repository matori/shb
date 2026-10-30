<script>
  import formatDateTime from "~/utils/formatDateTime"

  // datetime: ISO 8601 の日時の文字列
  let { datetime, showSeconds = true, class: className = "", ...rest } = $props()

  const date = $derived(new Date(datetime))
</script>

<time {...rest} datetime={date.toISOString()} class={[className, "Time"]}>{formatDateTime(date, { showSeconds })}</time>

<style>
  :global {
    .Time {
      white-space: nowrap;
    }
  }
</style>
