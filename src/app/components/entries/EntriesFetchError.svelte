<script>
  import FetchError from "~/components/common/FetchError"

  let { class: className = "", ...rest } = $props()
</script>

<FetchError {...rest} class={[className, "EntriesFetchError"]} />

<style lang="scss" global>
  .EntriesFetchError {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--color-border-base);
    padding: get-lines(1);
  }
</style>
