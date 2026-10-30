<script>
  import { untrack } from "svelte"
  import { settings, MIN_AUTO_REFRESH_INTERVAL_MINUTES, headerLinksToText } from "~/store/settings.svelte.js"
  import Button from "~/elements/Button.svelte"
  import Dialog from "~/components/common/Dialog.svelte"

  let { open = $bindable(false) } = $props()

  const id = $props.id()

  const themeOptions = [
    { value: "auto", label: "自動（OSの設定に合わせる）" },
    { value: "light", label: "ライト" },
    { value: "dark", label: "ダーク" },
  ]

  // フォームの値。「設定を保存」を押したときに settings に反映する
  let theme = $state("auto")
  let autoRefreshIntervalMinutes = $state(MIN_AUTO_REFRESH_INTERVAL_MINUTES)
  let headerLinksText = $state("")
  let statusMessage = $state("")

  // 開くたびに保存されている値をフォームに入れ直し、保存せずに閉じた変更は捨てる
  $effect.pre(() => {
    if (!open) {
      return
    }
    untrack(() => {
      theme = settings.theme
      autoRefreshIntervalMinutes = settings.autoRefreshIntervalMinutes
      headerLinksText = headerLinksToText(settings.headerLinks)
      statusMessage = ""
    })
  })

  function onSubmit(event) {
    event.preventDefault()
    settings.theme = theme
    settings.autoRefreshIntervalMinutes = autoRefreshIntervalMinutes
    settings.headerLinks = headerLinksText
    statusMessage = "設定を保存しました"
  }
</script>

<Dialog label="設定" bind:open>
  <form class="SettingsDialog" onsubmit={onSubmit}>
    <div class="SettingsDialog-body">
      <fieldset class="SettingsDialog-item SettingsDialog-fieldset">
        <legend class="SettingsDialog-label">表示テーマ</legend>
        <div class="SettingsDialog-options">
          {#each themeOptions as option (option.value)}
            <label class="SettingsDialog-option">
              <input type="radio" name="theme" value={option.value} bind:group={theme} />
              {option.label}
            </label>
          {/each}
        </div>
      </fieldset>
      <p class="SettingsDialog-item">
        <label for="{id}-interval" class="SettingsDialog-label">エントリー一覧の自動更新間隔</label>
        <input
          type="number"
          id="{id}-interval"
          min={MIN_AUTO_REFRESH_INTERVAL_MINUTES}
          required
          aria-describedby="{id}-interval-unit"
          class="SettingsDialog-interval"
          bind:value={autoRefreshIntervalMinutes}
        />
        <span id="{id}-interval-unit">分</span>
      </p>
      <p class="SettingsDialog-item">
        <label for="{id}-links" class="SettingsDialog-label">ヘッダーのリンク集</label>
        <span id="{id}-links-hint" class="SettingsDialog-hint">
          <code>[ラベル](URL)</code>
          形式を改行区切りで指定できます
        </span>
        <textarea
          id="{id}-links"
          aria-describedby="{id}-links-hint"
          class="SettingsDialog-textarea"
          bind:value={headerLinksText}></textarea>
      </p>
    </div>
    <div class="SettingsDialog-footer">
      <p role="status" class="SettingsDialog-status">{statusMessage}</p>
      <Button type="submit" class="SettingsDialog-submit">設定を保存</Button>
    </div>
  </form>
</Dialog>

<style>
  :global {
    .SettingsDialog {
      position: relative;
      border-radius: var(--radius-panel);
      overflow: hidden;
      background-color: var(--color-surface);
      min-width: calc(var(--content-min-width) * 0.8);
    }

    .SettingsDialog-body {
      padding: var(--line);
    }

    .SettingsDialog-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--line);
      position: sticky;
      bottom: 0;
      border-top: 1px solid var(--color-line);
      padding: calc(var(--line) * 0.75) var(--line);
      background-color: var(--color-surface);
    }

    .SettingsDialog-status {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      margin: 0;
      color: var(--color-text-sub);
    }

    .SettingsDialog-item {
      font-size: var(--fs-m);
      line-height: var(--lh-m);
      margin-top: 0;

      &:nth-last-child(n + 2) {
        margin-bottom: var(--line);
      }
    }

    .SettingsDialog-fieldset {
      border: 0;
      padding: 0;
      min-width: 0;
    }

    .SettingsDialog-options {
      display: flex;
      flex-wrap: wrap;
      gap: calc(var(--line) * 0.25) var(--line);
    }

    .SettingsDialog-option {
      display: inline-flex;
      align-items: center;
      gap: 0.4em;
      cursor: pointer;

      input {
        margin: 0;
        accent-color: var(--color-accent);
      }
    }

    .SettingsDialog-label {
      display: block;
      margin-bottom: calc(var(--line) * 0.5);
      font-weight: var(--fw-bold);
    }

    /* ラベルとテキストエリアの間に置く補足 */
    .SettingsDialog-hint {
      font-size: var(--fs-s);
      display: block;
      margin-top: calc(var(--line) * -0.5);
      margin-bottom: calc(var(--line) * 0.5);
      color: var(--color-text-muted);

      code {
        border-radius: 4px;
        padding: 0 0.3em;
        background-color: var(--color-surface-sub);
        font-family: var(--ff-mono);
      }
    }

    .SettingsDialog-interval,
    .SettingsDialog-textarea {
      font-size: var(--fs-m);
      line-height: var(--lh-m);
      box-sizing: border-box;
      border: 1px solid var(--color-line-strong);
      border-radius: var(--radius-control);
      padding: 0.3em 0.6em;
      font-family: inherit;
      color: var(--color-text);
    }

    .SettingsDialog-interval {
      width: 5em;
      margin-right: 0.3em;
    }

    .SettingsDialog-textarea {
      width: 100%;
      height: calc(var(--line) * 5);
    }

    .SettingsDialog-submit {
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
