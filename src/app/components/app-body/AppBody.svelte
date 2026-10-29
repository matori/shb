<script>
  import ContentContainer from "~/components/app-body/ContentContainer"

  let { class: className = "", ...rest } = $props()
</script>

<div {...rest} class={[className, "AppBody"]}>
  <ContentContainer class="AppBody-inner" />
</div>

<style lang="scss" global>
  .AppBody {
    padding-right: get-lines(1);
    padding-bottom: get-lines(1);
    padding-left: get-lines(1);
  }

  .AppBody-inner {
    margin: auto;
    height: 100%;
    max-width: var(--content-max-width);
    min-width: var(--content-min-width);
  }
</style>
