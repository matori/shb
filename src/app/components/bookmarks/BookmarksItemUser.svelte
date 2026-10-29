<script>
  import Link from "~/elements/Link"

  let { user, url, class: className = "", ...rest } = $props()
</script>

<div {...rest} class={[className, "BookmarksItemUser"]}>
  <Link {url} class="BookmarksItemUser-link">{user}</Link>
</div>

<style>
  :global {
    .BookmarksItemUser {
    }

    .BookmarksItemUser-link {
      color: var(--color-text-blue);
      font-weight: var(--fw-bold);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
