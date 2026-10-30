<script>
  import Link from "~/elements/Link.svelte"

  let { title, url, multiLine, class: className = "", ...rest } = $props()
</script>

<h3 {...rest} class={[className, "DetailInfoTitle", { _singleLine: !multiLine }]}>
  <Link {url} title={multiLine ? null : title} class="DetailInfoTitle-link">{title}</Link>
</h3>

<style>
  :global {
    .DetailInfoTitle {
      font-size: var(--fs-xl);
      line-height: var(--lh-xl);
      margin: 0;
      font-weight: var(--fw-bold);

      &._singleLine {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .DetailInfoTitle-link {
      overflow-wrap: break-word;
      color: var(--color-text);
      text-decoration: none;

      &:hover {
        color: var(--color-accent);
        text-decoration: underline;
      }
    }
  }
</style>
