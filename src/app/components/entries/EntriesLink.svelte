<script>
  import HatenaBookmarkLink from "~/components/common/HatenaBookmarkLink.svelte"

  let { category, type, class: className = "", ...rest } = $props()

  const url = $derived(`https://b.hatena.ne.jp/${type.key}/${category.key}`)
</script>

<HatenaBookmarkLink {...rest} {url} class={[className, "EntriesLink"]}>
  「{category.label}」の{type.label}エントリーをはてなブックマークで見る
</HatenaBookmarkLink>
