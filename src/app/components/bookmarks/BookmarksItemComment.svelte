<script>
  import Link from "~/elements/Link"

  let { commentTexts, class: className = "", ...rest } = $props()
</script>

<p {...rest} class={[className, "BookmarksItemComment"]}>
  {#each commentTexts as text}
    {#if text.type === "url"}
      <Link url={text.text} class="BookmarksItemComment-link">{text.text}</Link>
    {:else if text.type === "entryEid"}
      <Link url="https://b.hatena.ne.jp/entry/{text.eid}" class="BookmarksItemComment-link">{text.text}</Link>
    {:else if text.type === "idCall"}
      <Link url="https://b.hatena.ne.jp/{text.user}" class="BookmarksItemComment-link">{text.text}</Link>
    {:else}{text.text}{/if}
  {/each}
</p>

<style lang="scss" global>
  .BookmarksItemComment {
    margin: 0;
  }

  .BookmarksItemComment-link {
    color: var(--color-text-blue);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
