<script>
  import FetchError from "~/components/common/FetchError"

  let { class: className = "", ...rest } = $props()
</script>

<FetchError {...rest} class={[className, "EntriesFetchError"]} />

<style>
  :global {
    .EntriesFetchError {
      border-bottom: 1px solid var(--color-line);
      padding: var(--line);
    }
  }
</style>
