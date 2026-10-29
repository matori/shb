<script>
  import DetailInfo from "~/components/detail-info/DetailInfo"
  import BookmarkContainer from "~/components/bookmarks/BookmarksContainer"

  let { detailData, itemData, infoIndex, class: className = "", ...rest } = $props()
</script>

<article {...rest} class={[className, "DetailContent"]}>
  <DetailInfo detailContent={detailData.entries[infoIndex].content} {itemData} class="DetailContent-info" />
  <div class="DetailContent-body">
    <BookmarkContainer data={detailData.entries} class="DetailContent-bookmark" />
  </div>
</article>

<style lang="scss" global>
  .DetailContent {
    display: grid;
    grid-template-rows: min-content 1fr;
    gap: get-lines(1) - $line-edge;
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
</style>
