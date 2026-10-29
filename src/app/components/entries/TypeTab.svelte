<script>
  import entryTypes from "~/constants/entryTypes"
  import { selectedTypeTabIndex } from "~/store/ui"
  import { entriesFetchErrorMessage, hasEntriesData } from "~/store/entries"
  import TabContent from "~/components/common/TabContent"
  import EntryList from "~/components/entry-list/EntryList"
  import EntriesFetchError from "~/components/entries/EntriesFetchError"
  import EntriesLink from "~/components/entries/EntriesLink"

  let { category, data, class: className = "", ...rest } = $props()
</script>

<TabContent
  {...rest}
  class={[className, "TypeTab"]}
  tabs={entryTypes}
  panelClass="ScrollShadow"
  selected={$selectedTypeTabIndex}
  label="カテゴリー「{category.label}」の人気エントリーと新着エントリー"
  onselect={(index) => selectedTypeTabIndex.set(index)}
>
  {#snippet children({ key, label })}
    <h3 class="TypeTab-heading">カテゴリー「{category.label}」の{label}エントリー</h3>
    {#if data[key].initializing}
      <p class="TypeTab-initial">初期化中です</p>
    {:else if $entriesFetchErrorMessage && !$hasEntriesData}
      <EntriesFetchError display="entries" when="connection" message={$entriesFetchErrorMessage} />
    {:else if !data[key].error}
      <EntryList items={data[key].items} />
    {:else if data[key].error}
      <EntriesFetchError display="entries" when="api" message={data[key].message} />
    {:else}
      <EntriesFetchError display="entries" />
    {/if}
    <p class="TypeTab-helper">
      <EntriesLink {category} type={{ key, label }} class="TypeTab-link" />
    </p>
  {/snippet}
</TabContent>

<style>
  :global {
    /* 人気・新着は、切り替えボタン（セグメント型）にする */
    .TypeTab > .TabContent-tabList {
      justify-self: start;
      gap: 2px;
      margin: calc(var(--line) * 0.4) calc(var(--line) * 0.75);
      border-radius: var(--radius-pill);
      padding: 3px;
      background-color: var(--color-surface-sub);

      .TabContent-tab {
        padding: 0.1em 1.4em;
        background-color: transparent;

        &:hover {
          background-color: transparent;
          color: var(--color-text);
        }

        &[aria-selected="true"] {
          background-color: var(--color-surface);
          color: var(--color-text);
          font-weight: var(--fw-bold);
          box-shadow: var(--shadow-selected);
        }
      }
    }

    .TypeTab > .TabContent-body > .TabContent-panel {
      overflow-y: auto;
      border-top: 1px solid var(--color-line);
    }

    .TypeTab-heading {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      border: 0;
      padding: 0;
      clip: rect(0 0 0 0);
      overflow: hidden;
    }

    .TypeTab-initial {
      font-size: var(--fs-m);
      line-height: var(--lh-m);
      margin: 0;
      border-bottom: 1px solid var(--color-line);
      padding: var(--line);
      color: var(--color-text-muted);
      text-align: center;
    }

    .TypeTab-helper {
      margin: 0;
      padding: var(--line);
      text-align: center;
    }
  }
</style>
