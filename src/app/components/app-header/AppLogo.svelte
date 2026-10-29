<script>
  let { class: className = "", ...rest } = $props()
</script>

<h1 {...rest} class={[className, "AppLogo"]}>
  <a href="/" class="AppLogo-link">しんぷるはてぶ</a>
</h1>

<style>
  :global {
    .AppLogo {
      font-size: var(--fs-l);
      line-height: var(--lh-l);
      margin-top: 0;
      margin-bottom: 0;
      font-weight: var(--fw-bold);
      white-space: nowrap;
    }

    .AppLogo-link {
      color: inherit;
      text-decoration: none;

      &:hover {
        color: inherit;
        text-decoration: underline;
      }
    }
  }
</style>
