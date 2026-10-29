<script>
  let { class: className = "", ...rest } = $props()
</script>

<section {...rest} class={[className, "DetailNoBookmarkError"]}>
  <p class="DetailNoBookmarkError-message">このエントリーはまだブックマークされていません</p>
</section>

<style>
  :global {
    .DetailNoBookmarkError {
      border-radius: 0 0 var(--radius-panel) var(--radius-panel);
      padding: calc(var(--line) * 0.5) calc(var(--line) * 0.75) calc(var(--line) * 0.75);
      background-color: var(--color-surface);
    }

    .DetailNoBookmarkError-message {
      font-size: var(--fs-m);
      line-height: var(--lh-m);
      margin: 0;
      color: var(--color-text-sub);
    }
  }
</style>
