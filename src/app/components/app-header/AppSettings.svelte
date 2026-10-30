<script>
  import { settings, THEMES, MIN_AUTO_REFRESH_INTERVAL_MINUTES, headerLinksToText } from "~/store/settings.svelte.js"
  import Button from "~/elements/Button.svelte"
  import Icon from "~/elements/Icon.svelte"
  import Dialog from "~/components/common/Dialog.svelte"

  let { class: className = "", ...rest } = $props()

  let settingsOpen = $state(false)
  let autoRefreshIntervalInput = $state()
  let linksText = $state("")
  let themeValue = $state("auto")

  const themeOptions = [
    { value: "auto", label: "自動（OSの設定に合わせる）" },
    { value: "light", label: "ライト" },
    { value: "dark", label: "ダーク" },
  ]

  $effect.pre(() => {
    linksText = headerLinksToText(settings.headerLinks)
  })

  $effect.pre(() => {
    themeValue = settings.theme
  })

  function onSubmit(event) {
    event.preventDefault()
    settings.theme = themeValue
    settings.autoRefreshIntervalMinutes = autoRefreshIntervalInput.value
    settings.headerLinks = linksText
  }
</script>

<div {...rest} class={[className, "AppSettings"]}>
  <Button
    title="自動更新を{settings.autoRefreshEnabled ? '停止する' : '有効にする'}"
    class="AppSettings-button"
    role="switch"
    aria-checked={settings.autoRefreshEnabled}
    onclick={() => (settings.autoRefreshEnabled = !settings.autoRefreshEnabled)}
  >
    <Icon name="checkbox-checked" class="AppSettings-icon {settings.autoRefreshEnabled ? '' : '_hide'}" />
    <Icon name="checkbox-outline" class="AppSettings-icon {settings.autoRefreshEnabled ? '_hide' : ''}" />
    自動更新
  </Button>
  <Button class="AppSettings-button _primary" aria-haspopup="dialog" onclick={() => (settingsOpen = true)}>
    <Icon name="settings" class="AppSettings-icon" />
    設定
  </Button>
  <Dialog label="設定" bind:open={settingsOpen}>
    <form class="AppSettings-form" onsubmit={onSubmit}>
      <div class="AppSettings-body">
        <fieldset class="AppSettings-item AppSettings-fieldset">
          <legend class="AppSettings-label">表示テーマ</legend>
          <div class="AppSettings-options">
            {#each themeOptions as option (option.value)}
              <label class="AppSettings-option">
                <input type="radio" name="theme" value={option.value} bind:group={themeValue} />
                {option.label}
              </label>
            {/each}
          </div>
        </fieldset>
        <p class="AppSettings-item">
          <label for="autoRefreshInterval" class="AppSettings-label">エントリー一覧の自動更新間隔</label>
          <input
            type="number"
            id="autoRefreshInterval"
            value={settings.autoRefreshIntervalMinutes}
            min={MIN_AUTO_REFRESH_INTERVAL_MINUTES}
            class="AppSettings-time"
            bind:this={autoRefreshIntervalInput}
          />
          分
        </p>
        <p class="AppSettings-item">
          <label for="links" class="AppSettings-label">
            ヘッダーのリンク集
            <br />
            <span>
              <code>[ラベル](URL)</code>
              形式を改行区切りで指定できます
            </span>
          </label>
          <textarea id="links" class="AppSettings-textarea" bind:value={linksText}></textarea>
        </p>
      </div>
      <div class="AppSettings-footer">
        <Button type="submit" class="AppSettings-submit">設定を保存</Button>
      </div>
    </form>
  </Dialog>
</div>

<style>
  :global {
    .AppSettings {
      display: flex;
      align-items: center;
      gap: calc(var(--line) * 0.25);
    }

    .AppSettings-button {
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

      &._primary {
        background-color: var(--color-surface-sub);
        color: var(--color-text);

        &:hover {
          background-color: var(--color-line-strong);
        }
      }
    }

    .AppSettings-icon {
      width: calc(var(--fs-s) * var(--lh-s));
      height: calc(var(--fs-s) * var(--lh-s));

      &._hide {
        display: none;
      }
    }

    .AppSettings-form {
      position: relative;
      border-radius: var(--radius-panel);
      overflow: hidden;
      background-color: var(--color-surface);
      min-width: calc(var(--content-min-width) * 0.8);
    }

    .AppSettings-body {
      padding: var(--line);
    }

    .AppSettings-footer {
      position: sticky;
      bottom: 0;
      border-top: 1px solid var(--color-line);
      padding: calc(var(--line) * 0.75) var(--line);
      background-color: var(--color-surface);
      text-align: right;
    }

    .AppSettings-item {
      font-size: var(--fs-m);
      line-height: var(--lh-m);
      margin-top: 0;

      &:nth-last-child(n + 2) {
        margin-bottom: var(--line);
      }
    }

    .AppSettings-fieldset {
      border: 0;
      padding: 0;
      min-width: 0;
    }

    .AppSettings-options {
      display: flex;
      flex-wrap: wrap;
      gap: calc(var(--line) * 0.25) var(--line);
    }

    .AppSettings-option {
      display: inline-flex;
      align-items: center;
      gap: 0.4em;
      cursor: pointer;

      input {
        margin: 0;
        accent-color: var(--color-accent);
      }
    }

    .AppSettings-label {
      display: block;
      margin-bottom: calc(var(--line) * 0.5);
      font-weight: var(--fw-bold);

      span {
        font-size: var(--fs-s);
        color: var(--color-text-muted);
        font-weight: var(--fw-normal);
      }

      code {
        border-radius: 4px;
        padding: 0 0.3em;
        background-color: var(--color-surface-sub);
        font-family: var(--ff-mono);
      }
    }

    .AppSettings-time,
    .AppSettings-textarea {
      font-size: var(--fs-m);
      line-height: var(--lh-m);
      box-sizing: border-box;
      border: 1px solid var(--color-line-strong);
      border-radius: var(--radius-control);
      padding: 0.3em 0.6em;
      font-family: inherit;
      color: var(--color-text);
    }

    .AppSettings-time {
      width: 5em;
      margin-right: 0.3em;
    }

    .AppSettings-textarea {
      width: 100%;
      height: calc(var(--line) * 5);
    }

    .AppSettings-submit {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      border-radius: var(--radius-pill);
      padding: 0.4em 1.4em;
      background-color: var(--color-accent);
      color: var(--color-on-accent);
      font-weight: var(--fw-medium);

      &:hover {
        background-color: var(--color-accent-hover);
      }
    }
  }
</style>
