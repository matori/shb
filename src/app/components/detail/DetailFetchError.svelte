<script>
  import FetchError from "~/components/common/FetchError"

  let { class: className = "", ...rest } = $props()
</script>

<div class={[className, "DetailFetchError"]}>
  <FetchError {...rest} class="DetailFetchError-error" />
</div>

<style>
  :global {
    .DetailFetchError {
      border-radius: 0 0 var(--radius-panel) var(--radius-panel);
      padding: calc(var(--line) * 0.5) calc(var(--line) * 0.75) calc(var(--line) * 0.75);
      background-color: var(--color-surface);
    }
  }
</style>
