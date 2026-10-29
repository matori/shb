<script>
  import ICON_PATHS from "~/constants/iconPaths"

  let { name, title, class: className = "", ...rest } = $props()

  const icon = $derived(ICON_PATHS[name])
</script>

<svg
  {...rest}
  viewBox="0 0 {icon.size} {icon.size}"
  role={title ? "img" : null}
  aria-label={title}
  class={[className, "Icon"]}
>
  <path d={icon.path} />
</svg>

<style lang="scss" global>
  .Icon {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }
</style>
