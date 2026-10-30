<script>
  import DetailInfoTitle from "~/components/detail-info/DetailInfoTitle.svelte"
  import DetailInfoSite from "~/components/detail-info/DetailInfoSite.svelte"
  import DetailInfoDate from "~/components/detail-info/DetailInfoDate.svelte"
  import DetailInfoCategory from "~/components/detail-info/DetailInfoCategory.svelte"
  import DetailInfoBookmarkCount from "~/components/detail-info/DetailInfoBookmarkCount.svelte"

  let { detailContent, itemData, detailInfoExpanded, class: className = "", ...rest } = $props()
</script>

<header {...rest} class={[className, "DetailInfoHeader"]}>
  <DetailInfoTitle
    title={detailContent.title}
    url={detailContent.url}
    multiLine={detailInfoExpanded}
    class="DetailInfoHeader-title"
  />
  <DetailInfoBookmarkCount
    url={detailContent.entry_url}
    count={detailContent.count}
    class="DetailInfoHeader-bookmark"
  />
  {#if itemData.realCategory.label}
    <DetailInfoCategory
      slug={itemData.realCategory.slug}
      label={itemData.realCategory.label}
      class="DetailInfoHeader-category"
    />
  {/if}
  <DetailInfoSite
    url={itemData.siteEntriesUrl}
    label={itemData.siteEntriesLabel}
    favicon={itemData.favicon}
    class="DetailInfoHeader-site"
  />
  <DetailInfoDate datetime={itemData.date} class="DetailInfoHeader-date" title="最初にブックマークされた日時" />
</header>

<style>
  :global {
    .DetailInfoHeader {
      display: grid;
      grid-template-columns: min-content min-content 1fr min-content;
      align-items: center;
      row-gap: calc(var(--line) * 0.4);
      column-gap: calc(var(--line) * 0.5);
    }

    .DetailInfoHeader-title {
      grid-column: 1 / 5;
      min-width: 0;
    }

    .DetailInfoHeader-bookmark {
      grid-column: 1 / 2;
    }

    .DetailInfoHeader-category {
      grid-column: 2 / 3;
    }

    .DetailInfoHeader-site {
      grid-column: 3 / 4;
      min-width: 0;
    }

    .DetailInfoHeader-date {
      grid-column: 4 / 5;
    }
  }
</style>
