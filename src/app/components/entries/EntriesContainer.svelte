<script>
  import CategoryTab from "~/components/entries/CategoryTab.svelte"
  import EntriesHeader from "~/components/entries/EntriesHeader.svelte"
  import { entryFeeds } from "~/store/entryFeeds.svelte.js"

  let { class: className = "", ...rest } = $props()
</script>

<section {...rest} class={[className, "EntriesContainer"]}>
  <EntriesHeader heading="エントリーの一覧" class="EntriesContainer-header" />
  {#if entryFeeds.errorMessage && entryFeeds.hasLoaded}
    <p class="EntriesContainer-notice" role="status">
      一覧の更新に失敗したため、前回取得した一覧を表示しています（{entryFeeds.errorMessage}）
    </p>
  {/if}
  <div class="EntriesContainer-entries">
    <CategoryTab class="EntriesContainer-content" />
  </div>
</section>

<style>
  :global {
    .EntriesContainer {
      display: grid;
      grid-template-rows: min-content 1fr;
      border-radius: var(--radius-panel);
      overflow: hidden;
      background-color: var(--color-surface);

      &:has(> .EntriesContainer-notice) {
        grid-template-rows: min-content min-content 1fr;
      }
    }

    .EntriesContainer-notice {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      margin: 0;
      padding: 0 calc(var(--line) * 0.75) calc(var(--line) * 0.4);
      color: var(--color-error);
    }

    .EntriesContainer-entries {
      min-height: 0;
    }
  }
</style>
