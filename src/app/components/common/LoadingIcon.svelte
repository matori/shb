<script>
  import Icon from "~/elements/Icon.svelte"

  // 読み込み中に回るアイコン。読み込み中でないときも、見出しの幅が変わらないように場所は空けておく
  // 飾りなので読み上げない。読み込み中であることは、使う側の role="status" で知らせる
  let { loading = false, class: className = "", ...rest } = $props()
</script>

<Icon {...rest} name="refresh" class={[className, "LoadingIcon", { _loading: loading }]} />

<style>
  :global {
    .LoadingIcon {
      width: calc(var(--fs-s) * var(--lh-s));
      height: calc(var(--fs-s) * var(--lh-s));
      margin-left: 0.4em;
      color: var(--color-text-muted);
      opacity: 0;
      animation-duration: 1s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;

      &._loading {
        opacity: 1;
        animation-name: syncing;
      }
    }
  }
</style>
