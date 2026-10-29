<script>
  import Link from "~/elements/Link"

  let { url, title, class: className = "", ...rest } = $props()
</script>

<div {...rest} class={[className, "EntryListItemLink"]}>
  <Link {url} class="EntryListItemLink-link">{title}</Link>
</div>

<style lang="scss" global>
  .EntryListItemLink {
  }

  .EntryListItemLink-link {
    @include text(-1);
    color: var(--color-text-blue);
    text-decoration: none;
    overflow-wrap: break-word;

    &:visited {
      color: var(--color-text-gray);
    }

    &:hover {
      text-decoration: underline;
    }
  }
</style>
