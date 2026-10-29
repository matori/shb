<script>
  import ContentContainer from "~/components/app-body/ContentContainer"

  let { class: className = "", ...rest } = $props()
</script>

<div {...rest} class={[className, "AppBody"]}>
  <ContentContainer class="AppBody-inner" />
</div>

<style>
  :global {
    .AppBody {
      padding-right: var(--line);
      padding-bottom: var(--line);
      padding-left: var(--line);
    }

    .AppBody-inner {
      margin: auto;
      height: 100%;
      max-width: var(--content-max-width);
      min-width: var(--content-min-width);
    }
  }
</style>
