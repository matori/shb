<script>
  import FetchError from "~/components/common/FetchError"

  let { class: className = "", ...rest } = $props()
</script>

<div class={[className, "DetailFetchError"]}>
  <FetchError {...rest} class="DetailFetchError-error" />
</div>

<style lang="scss" global>
  .DetailFetchError {
    border-width: 1px;
    border-style: solid;
    border-color: var(--color-border-base);
    padding: get-lines(1);
    background-color: var(--color-bg-content);
    box-shadow: var(--box-shadow-base);
  }

  .DetailFetchError-error {
  }
</style>
