<script>
  import { selectedBookmarksTabIndex } from "~/store/ui"
  import DetailContent from "~/components/detail/DetailContent"
  import DetailFetchError from "~/components/detail/DetailFetchError.svelte"
  import DetailHeader from "~/components/detail/DetailHeader"
  import DetailNoBookmarkError from "~/components/detail/DetailNoBookmarkError.svelte"

  let { detail, message, class: className = "", ...rest } = $props()

  const entries = $derived(detail ? detail.data.entries : [])
  // 指定したURLのエントリー。ブックマークページを指定した場合は2階以降になる
  const floorIndex = $derived(detail ? detail.data.floor - 1 : 0)
  const target = $derived(entries[floorIndex])

  $effect.pre(() => {
    selectedBookmarksTabIndex.set(floorIndex)
  })
</script>

<section {...rest} class={[className, "DetailContainer"]}>
  <DetailHeader heading="エントリー情報" class="DetailContainer-header" />
  <div class="DetailContainer-body">
    {#if message}
      <DetailFetchError display="detail" when="connection" {message} />
    {:else if entries[0].error}
      <DetailFetchError display="detail" when="api" message={entries[0].message} />
    {:else if !target}
      <!-- 指定したURLの階まで取得する前に失敗した場合 -->
      <DetailFetchError
        display="detail"
        when="api"
        message="{entries.length + 1}階の取得に失敗したため、指定したページ（{floorIndex + 1}階）を表示できません"
      />
    {:else if target.content}
      <DetailContent detailData={detail.data} itemData={detail.itemData} {floorIndex} class="DetailContainer-content" />
    {:else}
      <DetailNoBookmarkError class="DetailContainer-noBookmark" />
    {/if}
  </div>
</section>

<style>
  :global {
    /* 見出しの行と、その下のパネル（エントリー情報・エラー）をつなげて1枚のパネルに見せる */
    .DetailContainer {
      display: grid;
      grid-template-rows: min-content auto;
    }

    .DetailContainer-body {
      min-height: 0;
    }

    .DetailContainer-content {
      height: 100%;
    }
  }
</style>
