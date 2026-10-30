<script>
  import Link from "~/elements/Link.svelte"

  let { url, title, class: className = "", ...rest } = $props()
</script>

<div {...rest} class={[className, "EntryListItemLink"]}>
  <Link {url} class="EntryListItemLink-link">{title}</Link>
</div>

<style>
  :global {
    .EntryListItemLink-link {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      display: -webkit-box;
      overflow: hidden;
      color: var(--color-text);
      font-weight: var(--fw-medium);
      text-decoration: none;
      overflow-wrap: break-word;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;

      &:visited {
        color: var(--color-text-muted);
      }

      &:hover {
        color: var(--color-accent);
        text-decoration: underline;
      }
    }
  }
</style>
