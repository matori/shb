<script>
  import createNullValueObject from "~/utils/createNullValueObject"

  // props
  let name
  let title
  export { name, title }

  const removeAttrs = createNullValueObject(["name", "title", "viewBox"])

  // SVG自体ではなく中身がほしいのでdivに突っ込んで文字列として取り出す
  const div = document.createElement("div")
  div.innerHTML = require(`~/assets/icons/${name}.svg`)
  const svg = div.firstElementChild
  const viewBox = svg.getAttribute("viewBox")
  const svgChildren = svg.innerHTML

  $: title = title ? `<title>${title}</title>` : ""
</script>

<template>
  <svg {...$$props} {...removeAttrs} {viewBox} class="{$$props.class || ''} Icon">
    {@html title + svgChildren}
  </svg>
</template>

<style lang="scss" global>
  .Icon {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }
</style>
