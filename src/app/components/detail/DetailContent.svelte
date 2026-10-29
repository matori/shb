<script>
  import DetailInfo from "~/components/detail-info/DetailInfo"
  import BookmarkContainer from "~/components/bookmarks/BookmarksContainer"

  let { detailData, itemData, floorIndex, class: className = "", ...rest } = $props()
</script>

<article {...rest} class={[className, "DetailContent"]}>
  <DetailInfo detailContent={detailData.entries[floorIndex].content} {itemData} class="DetailContent-info" />
  <div class="DetailContent-body">
    <BookmarkContainer data={detailData.entries} partial={detailData.error} class="DetailContent-bookmark" />
  </div>
</article>

<style>
  :global {
    .DetailContent {
      display: grid;
      grid-template-rows: min-content 1fr;
      gap: calc(var(--line) - var(--line-edge));
    }

    .DetailContent-info {
      border-width: 1px;
      border-style: solid;
      border-color: var(--color-border-base);
      background-color: var(--color-bg-content);
      box-shadow: var(--shadow-base);
    }

    .DetailContent-body {
      min-height: 0;
    }

    .DetailContent-bookmark {
      max-height: 100%;
    }
  }
</style>
