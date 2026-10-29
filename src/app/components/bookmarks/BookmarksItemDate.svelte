<script>
  import dayjs from "dayjs"
  import Link from "~/elements/Link"
  import Time from "~/elements/Time"

  let { eid, user, timestamp, class: className = "", ...rest } = $props()

  const datetime = $derived(timestamp.split("/").join("-").replace(" ", "T") + ":00+09:00")
  const url = $derived(`https://b.hatena.ne.jp/${user}/${dayjs(datetime).format("YYYYMMDD")}#bookmark-${eid}`)
</script>

<Link {...rest} {url} class={[className, "BookmarksItemDate"]} title="ブックマークのパーマリンク">
  <Time {datetime} needSeconds={false} class="BookmarksItemDate-date" />
</Link>

<style lang="scss" global>
  .BookmarksItemDate {
    @include text(-2);
    color: var(--color-text-gray);
    white-space: nowrap;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .BookmarksItemDate-date {
  }
</style>
