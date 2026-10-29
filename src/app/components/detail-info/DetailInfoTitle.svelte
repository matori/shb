<script>
  import Link from "~/elements/Link"

  let { title, url, multiLine, class: className = "", ...rest } = $props()
</script>

<h3 {...rest} class={[className, "DetailInfoTitle", { _singleLine: !multiLine }]}>
  <Link {url} title={multiLine ? null : title} class="DetailInfoTitle-link">{title}</Link>
</h3>

<style lang="scss" global>
  .DetailInfoTitle {
    @include text(1);
    margin: 0;
    font-weight: var(--fw-normal);

    &._singleLine {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .DetailInfoTitle-link {
    overflow-wrap: break-word;
    color: var(--color-text-blue);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
