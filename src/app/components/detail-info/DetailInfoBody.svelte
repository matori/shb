<script>
  import DetailInfoDescription from "~/components/detail-info/DetailInfoDescription"
  import DetailInfoImage from "~/components/detail-info/DetailInfoImage"
  import DetailInfoTags from "~/components/detail-info/DetailInfoTags"
  import DetailInfoSearchTwitter from "~/components/detail-info/DetailInfoSearchTwitter"

  let { detailContent, itemData, detailInfoExpanded, class: className = "", ...rest } = $props()
</script>

<div
  {...rest}
  class={[
    className,
    "DetailInfoBody",
    { _hasImage: itemData.image, _hasTags: itemData.tags.length, _hidden: !detailInfoExpanded },
  ]}
>
  <DetailInfoDescription text={itemData.description} class="DetailInfoBody-description" />
  {#if itemData.image}
    <DetailInfoImage image={itemData.image} class="DetailInfoBody-image" />
  {/if}
  {#if itemData.tags.length}
    <DetailInfoTags tags={itemData.tags} class="DetailInfoBody-tags" />
  {/if}
  <DetailInfoSearchTwitter url={detailContent.url} class="DetailInfoBody-twitter" />
</div>

<style>
  :global {
    .DetailInfoBody {
      --c-gap: calc(var(--line) * 0.25 + var(--line-edge));
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: min-content 1fr;
      column-gap: var(--c-gap);
      row-gap: calc(var(--line) * 0.5);

      &._hasImage {
        grid-template-columns: 1fr fit-content(calc(30% - var(--c-gap) / 2));
      }

      &._hasTags {
        grid-template-rows: min-content min-content 1fr;
      }

      &._hidden {
        display: block;
      }
    }

    .DetailInfoBody-description {
      grid-column-start: 1;
      grid-column-end: 2;
      min-width: 0;

      .DetailInfoBody._hidden & {
        display: none;
      }
    }

    .DetailInfoBody-image {
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 4;

      .DetailInfoBody._hidden & {
        display: none;
      }
    }

    .DetailInfoBody-tags {
      grid-column-start: 1;
      grid-column-end: 2;
      min-width: 0;

      .DetailInfoBody._hidden & {
        display: none;
      }
    }

    .DetailInfoBody-twitter {
      grid-column-start: 1;
      grid-column-end: 2;
    }
  }
</style>
