<script>
  import ICON_PATHS from "~/constants/iconPaths"

  // props
  let name
  let title
  export { name, title }

  $: icon = ICON_PATHS[name]
  $: role = title ? 'img' : null
</script>

<template>
  <svg
    {...$$props}
    viewBox="0 0 {icon.size} {icon.size}"
    {role}
    aria-label="{title}"
    class="{$$props.class || ''} Icon">
    <path d="{icon.path}"/>
  </svg>
</template>

<style lang="scss" global>
  .Icon {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }
</style>
