<script>
  import { entryDetail } from "~/store/entryDetail.svelte.js"
  import EntriesPanel from "~/components/entries/EntriesPanel.svelte"
  import DetailContainer from "~/components/detail/DetailContainer.svelte"
  import Information from "~/components/information/Information.svelte"

  // 左にエントリーの一覧、右にエントリーの詳細（開いていなければインフォメーション）を並べる
  let { class: className = "", ...rest } = $props()
</script>

<main {...rest} class={[className, "AppMain"]}>
  <div class="AppMain-inner">
    <EntriesPanel class="AppMain-entries" />
    {#if entryDetail.isOpen}
      <DetailContainer
        detail={entryDetail.response}
        entry={entryDetail.entry}
        message={entryDetail.errorMessage}
        class="AppMain-detail"
      />
    {:else}
      <Information class="AppMain-information" />
    {/if}
  </div>
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
