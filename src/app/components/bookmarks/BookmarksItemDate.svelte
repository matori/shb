<script>
  import dayjs from "dayjs"
  import createNullValueObject from "~/utils/createNullValueObject"
  import Link from "~/elements/Link"
  import Time from "~/elements/Time"

  let eid
  let user
  let timestamp
  export { eid, user, timestamp }

  const removeAttrs = createNullValueObject(["eid", "user", "timestamp"])

  const datetime =
    timestamp
      .split("/")
      .join("-")
      .replace(" ", "T") + ":00+09:00"
  const url = `https://b.hatena.ne.jp/${user}/${dayjs(datetime).format("YYYYMMDD")}#bookmark-${eid}`
  const id = `bookmark-${user}-${eid}`
</script>

<template>
  <Link
    {...$$props}
    {...removeAttrs}
    {url}
    class="{$$props.class || ''} BookmarksItemDate"
    title="ブックマークのパーマリンク"
  >
    <Time {datetime} needSeconds="{false}" class="BookmarksItemDate-date" />
  </Link>
</template>

<style lang="scss" global>
  .BookmarksItemDate {
    @include text(-1);
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
