<script>
  import ICON_PATHS from "~/constants/iconPaths"

  // title があれば画像として読み上げ、なければ飾りとして読み上げから外す
  let { name, title, class: className = "", ...rest } = $props()

  const icon = $derived(ICON_PATHS[name])
</script>

<svg
  {...rest}
  viewBox="0 0 {icon.size} {icon.size}"
  role={title ? "img" : null}
  aria-label={title}
  aria-hidden={title ? null : "true"}
  class={[className, "Icon"]}
>
  <path d={icon.path} />
</svg>

<style>
  :global {
    .Icon {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
  }
</style>
