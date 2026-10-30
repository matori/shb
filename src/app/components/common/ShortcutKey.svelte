<script>
  // タブやボタンに添える、ショートカットキーの表示
  // キーは aria-keyshortcuts で伝えるので、名前が「人気 H」のようにならないよう読み上げない
  let { key, class: className = "", ...rest } = $props()
</script>

<kbd {...rest} class={[className, "ShortcutKey"]} aria-hidden="true">{key}</kbd>

<style>
  :global {
    .ShortcutKey {
      display: inline-block;
      margin-left: 0.4em;
      border: 1px solid currentColor;
      border-radius: 4px;
      padding: 0 0.3em;
      min-width: 1em;
      font-family: inherit;
      font-size: 0.8em;
      font-weight: var(--fw-normal);
      line-height: 1.4;
      text-align: center;
      vertical-align: 0.1em;
      opacity: 0.7;
    }
  }
</style>
