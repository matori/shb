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
      font-weight: var(--fw-normal);
      white-space: nowrap;
    }

    .AppLogo-link {
      display: flex;
      align-items: center;
      height: 100%;
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
