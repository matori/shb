<script>
  let { class: className = "", ...rest } = $props()
</script>

<section {...rest} class={[className, "DetailNoBookmarkError"]}>
  <p class="DetailNoBookmarkError-message">このエントリーはまだブックマークされていません</p>
</section>

<style>
  :global {
    .DetailNoBookmarkError {
      border-width: 1px;
      border-style: solid;
      border-color: var(--color-border-base);
      padding: var(--line);
      background-color: var(--color-bg-content);
      box-shadow: var(--box-shadow-base);
    }

    .DetailNoBookmarkError-message {
      margin: 0;
      font-size: var(--fs-m);
      line-height: var(--lh-m);
    }
  }
</style>
