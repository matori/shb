<script>
  import { entryDetail } from "~/store/entryDetail.svelte.js"
  import EntriesPanel from "~/components/entries/EntriesPanel.svelte"
  import EntryDetailPanel from "~/components/entry-detail/EntryDetailPanel.svelte"
  import Information from "~/components/information/Information.svelte"

  // 左にエントリーの一覧、右にエントリーの詳細（開いていなければインフォメーション）を並べる
  let { class: className = "", ...rest } = $props()

  // 右のパネルは読み込みが終わってから入れ替わるので、読み込みの状態はパネルの外で知らせる
  const detailStatus = $derived.by(() => {
    if (entryDetail.isLoading) {
      return "エントリー情報を読み込んでいます"
    }
    if (entryDetail.errorMessage) {
      return "エントリー情報の読み込みに失敗しました"
    }
    return entryDetail.isOpen ? "エントリー情報を表示しました" : ""
  })
</script>

<main {...rest} class={[className, "AppMain"]}>
  <div class="AppMain-inner">
    <EntriesPanel class="AppMain-entries" />
    {#if entryDetail.isOpen}
      <EntryDetailPanel class="AppMain-detail" />
    {:else}
      <Information class="AppMain-information" />
    {/if}
  </div>
  <p role="status" class="VisuallyHidden">{detailStatus}</p>
</main>

<style>
  :global {
    .AppMain {
      padding-right: var(--line);
      padding-bottom: var(--line);
      padding-left: var(--line);
    }

    .AppMain-inner {
      display: grid;
      grid-template-columns: repeat(2, calc(50% - var(--line) * 0.5));
      column-gap: var(--line);
      margin: auto;
      height: 100%;
      max-width: var(--content-max-width);
      min-width: var(--content-min-width);
    }

    .AppMain-entries,
    .AppMain-detail,
    .AppMain-information {
      min-height: 0;
    }
  }
</style>
