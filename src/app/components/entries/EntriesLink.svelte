<script>
  import LinkBox from "~/components/common/LinkBox.svelte"

  let { category, type, class: className = "", ...rest } = $props()

  const url = $derived(`https://b.hatena.ne.jp/${type.key}/${category.key}`)
</script>

<LinkBox {...rest} {url} class={[className, "EntriesLink"]}>
  「{category.label}」の{type.label}エントリーをはてなブックマークで見る
</LinkBox>

<style lang="scss" global>
  .EntriesLink {
  }
</style>
