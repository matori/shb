<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import LinkBox from "~/components/common/LinkBox.svelte"

  let category
  let type
  export { category, type }

  const removeAttrs = createNullValueObject(["category", "type"])

  const url = `https://b.hatena.ne.jp/${type.key}/${category.key}`
</script>

<template>
  <LinkBox {...$$props} {...removeAttrs} {url} class="{$$props.class || ''} EntriesLink">
    「{category.label}」の{type.label}エントリーをはてなブックマークで見る
  </LinkBox>
</template>

<style lang="scss" global>
  .EntriesLink {
  }
</style>
