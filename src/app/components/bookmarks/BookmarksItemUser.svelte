<script>
  import Link from "~/elements/Link.svelte"

  let { user, url, class: className = "", ...rest } = $props()
</script>

<div {...rest} class={[className, "BookmarksItemUser"]}>
  <Link {url} class="BookmarksItemUser-link">{user}</Link>
</div>

<style>
  :global {
    .BookmarksItemUser-link {
      color: var(--color-text);
      font-weight: var(--fw-bold);
      text-decoration: none;

      &:hover {
        color: var(--color-accent);
        text-decoration: underline;
      }
    }
  }
</style>
