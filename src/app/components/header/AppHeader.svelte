<script>
  import { settings } from "~/store/settings.svelte.js"
  import faviconUrl from "~/assets/icons/favicon.svg"
  import Button from "~/elements/Button.svelte"
  import Icon from "~/elements/Icon.svelte"
  import ToggleButton from "~/components/common/ToggleButton.svelte"
  import HeaderLinks from "~/components/header/HeaderLinks.svelte"
  import SettingsDialog from "~/components/header/SettingsDialog.svelte"

  let { class: className = "", ...rest } = $props()

  let settingsOpen = $state(false)
</script>

<header {...rest} class={[className, "AppHeader"]}>
  <div class="AppHeader-inner">
    <h1 class="AppHeader-logo">
      <a href="/" class="AppHeader-logoLink">
        <!-- ファビコンと同じアイコン。リンクの名前はアプリ名にするので、読み上げない -->
        <img src={faviconUrl} alt="" width="24" height="24" class="AppHeader-logoIcon" />
        しんぷるはてぶ
      </a>
    </h1>
    <HeaderLinks class="AppHeader-links" />
    <div class="AppHeader-tools">
      <ToggleButton
        title="エントリー一覧を、設定した間隔で自動的に更新します"
        class="AppHeader-button"
        bind:checked={settings.autoRefreshEnabled}
      >
        自動更新
      </ToggleButton>
      <Button class="AppHeader-button _settings" aria-haspopup="dialog" onclick={() => (settingsOpen = true)}>
        <Icon name="settings" class="AppHeader-icon" />
        設定
      </Button>
      <SettingsDialog bind:open={settingsOpen} />
    </div>
  </div>
</header>

<style>
  :global {
    .AppHeader {
      display: grid;
      grid-template-columns: 1fr minmax(var(--content-min-width), var(--content-max-width)) 1fr;
      column-gap: var(--line);
      padding-top: calc(var(--line) * 0.4);
      padding-bottom: calc(var(--line) * 0.4);
      background-color: var(--color-surface);
    }

    .AppHeader-inner {
      grid-column-start: 2;
      grid-column-end: 3;
      display: grid;
      grid-template-columns: min-content 1fr min-content;
      align-items: center;
      column-gap: var(--line);
    }

    .AppHeader-logo {
      font-size: var(--fs-l);
      line-height: var(--lh-l);
      margin-top: 0;
      margin-bottom: 0;
      font-weight: var(--fw-bold);
      white-space: nowrap;
    }

    .AppHeader-logoLink {
      display: inline-flex;
      align-items: center;
      gap: 0.4em;
      color: inherit;
      text-decoration: none;

      &:hover {
        color: inherit;
        text-decoration: underline;
      }
    }

    .AppHeader-logoIcon {
      flex-shrink: 0;
      width: 1.25em;
      height: 1.25em;
    }

    .AppHeader-links {
      min-width: 0;
    }

    .AppHeader-tools {
      display: flex;
      align-items: center;
      gap: calc(var(--line) * 0.25);
    }

    .AppHeader-button {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      display: flex;
      align-items: center;
      gap: 0.3em;
      border-radius: var(--radius-pill);
      padding: 0.25em 0.9em;
      color: var(--color-text-sub);
      white-space: nowrap;

      &:hover {
        background-color: var(--color-surface-sub);
        color: var(--color-text);
      }

      &._settings {
        background-color: var(--color-surface-sub);
        color: var(--color-text);

        &:hover {
          background-color: var(--color-line-strong);
        }
      }
    }

    .AppHeader-icon {
      width: calc(var(--fs-s) * var(--lh-s));
      height: calc(var(--fs-s) * var(--lh-s));
    }
  }
</style>
