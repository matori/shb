<script>
  import CategoryTab from "~/components/entries/CategoryTab"
  import EntriesHeader from "~/components/entries/EntriesHeader"
  import { entriesFetchErrorMessage, hasEntriesData } from "~/store/entries"

  let { class: className = "", ...rest } = $props()
</script>

<section {...rest} class={[className, "EntriesContainer"]}>
  <EntriesHeader heading="エントリーの一覧" class="EntriesContainer-header" />
  {#if $entriesFetchErrorMessage && $hasEntriesData}
    <p class="EntriesContainer-notice" role="status">
      一覧の更新に失敗したため、前回取得した一覧を表示しています（{$entriesFetchErrorMessage}）
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
      row-gap: calc(var(--line) * 0.5 - var(--line-edge));

      &:has(> .EntriesContainer-notice) {
        grid-template-rows: min-content min-content 1fr;
      }
    }

    .EntriesContainer-notice {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      margin: 0;
      color: var(--color-text-red);
    }

    .EntriesContainer-header {
    }

    .EntriesContainer-entries {
      border-width: 1px;
      border-style: solid;
      border-color: var(--color-border-base);
      min-height: 0;
      box-shadow: var(--shadow-base);
      background-color: var(--color-bg-content);
    }

    .EntriesContainer-content {
    }
  }
</style>
