<script>
  import createNullValueObject from "~/utils/createNullValueObject"
  import Link from "~/elements/Link"

  let url
  let count
  export { url, count }

  const removeAttrs = createNullValueObject(["url", "count"])

  $: countSuffix = count > 1 ? "users" : "user"
</script>

<template>
  <div {...$$props} {...removeAttrs} class="{$$props.class || ''} DetailInfoBookmarkCount">
    <Link {url} class="DetailInfoBookmarkCount-total" on:click>
      <span class="DetailInfoBookmarkCount-totalCount">{count}</span>
      <span class="DetailInfoBookmarkCount-totalSuffix">{countSuffix}</span>
    </Link>
  </div>
</template>

<style lang="scss" global>
  .DetailInfoBookmarkCount {
  }

  .DetailInfoBookmarkCount-total {
    @include text(2);
    position: relative;
    display: inline-flex;
    align-items: baseline;
    color: var(--color-text-red);
    text-decoration: none;

    &::after {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      border-top-width: 1px;
      border-top-style: solid;
      content: "";
      transform: scaleY(1);
    }

    &:hover::after {
      transform: scaleY(3);
    }
  }

  .DetailInfoBookmarkCount-totalCount {
  }

  .DetailInfoBookmarkCount-totalSuffix {
    @include text(-1, false);
    margin-left: 0.1em;
  }

</style>
