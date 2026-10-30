<script>
  import { untrack } from "svelte"
  import {
    settings,
    FONT_SIZES,
    MIN_AUTO_REFRESH_INTERVAL_MINUTES,
    MIN_CONTENT_MAX_WIDTH,
    headerLinksToText,
  } from "~/store/settings.svelte.js"
  import Button from "~/elements/Button.svelte"
  import Dialog from "~/components/common/Dialog.svelte"

  let { open = $bindable(false) } = $props()

  const id = $props.id()

  const themeOptions = [
    { value: "auto", label: "自動（OSの設定に合わせる）" },
    { value: "light", label: "ライト" },
    { value: "dark", label: "ダーク" },
  ]

  const fontSizeOptions = [
    { value: "auto", label: "ブラウザーの設定に合わせる" },
    ...FONT_SIZES.map((size) => ({ value: String(size), label: `${size}px` })),
  ]

  // フォームの値。「設定を保存」を押したときに settings に反映する
  let theme = $state("auto")
  let fontSize = $state("auto")
  let contentMaxWidth = $state(0)
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
      fontSize = String(settings.fontSize)
      contentMaxWidth = settings.contentMaxWidth
      autoRefreshIntervalMinutes = settings.autoRefreshIntervalMinutes
      headerLinksText = headerLinksToText(settings.headerLinks)
      statusMessage = ""
    })
  })

  function onSubmit(event) {
    event.preventDefault()
    settings.theme = theme
    settings.fontSize = fontSize
    settings.contentMaxWidth = contentMaxWidth
    // 最小幅より狭い値は最小幅になるので、保存した値を入力欄に戻す
    contentMaxWidth = settings.contentMaxWidth
    settings.autoRefreshIntervalMinutes = autoRefreshIntervalMinutes
    settings.headerLinks = headerLinksText
    statusMessage = "設定を保存しました"
  }
</script>

<Dialog label="設定" bind:open>
  <form class="SettingsDialog" onsubmit={onSubmit}>
    <div class="SettingsDialog-body">
      <fieldset class="SettingsDialog-group">
        <legend class="SettingsDialog-groupTitle">表示</legend>
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
        <div class="SettingsDialog-item">
          <label for="{id}-font-size" class="SettingsDialog-label">文字の大きさ</label>
          <p id="{id}-font-size-hint" class="SettingsDialog-hint">
            ページ全体の基本の文字の大きさです。行間や余白も一緒に変わります。
          </p>
          <select
            id="{id}-font-size"
            aria-describedby="{id}-font-size-hint"
            class="SettingsDialog-select"
            bind:value={fontSize}
          >
            {#each fontSizeOptions as option (option.value)}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>
        <div class="SettingsDialog-item">
          <label for="{id}-max-width" class="SettingsDialog-label">コンテンツの最大幅</label>
          <p id="{id}-max-width-hint" class="SettingsDialog-hint">
            エントリーの一覧と詳細を並べる部分の、最大の幅です。0 にすると画面の幅いっぱいに広げます。{MIN_CONTENT_MAX_WIDTH}
            より小さい値は {MIN_CONTENT_MAX_WIDTH} になります。
          </p>
          <input
            type="number"
            id="{id}-max-width"
            min="0"
            step="1"
            required
            aria-describedby="{id}-max-width-hint {id}-max-width-unit"
            class="SettingsDialog-number _wide"
            bind:value={contentMaxWidth}
          />
          <span id="{id}-max-width-unit">px</span>
        </div>
      </fieldset>
      <fieldset class="SettingsDialog-group">
        <legend class="SettingsDialog-groupTitle">エントリーの一覧</legend>
        <div class="SettingsDialog-item">
          <label for="{id}-interval" class="SettingsDialog-label">自動更新の間隔</label>
          <p id="{id}-interval-hint" class="SettingsDialog-hint">
            ヘッダーの「自動更新」をオンにしたときに、一覧を読み込み直す間隔です。{MIN_AUTO_REFRESH_INTERVAL_MINUTES}分より短くはできません。
          </p>
          <input
            type="number"
            id="{id}-interval"
            min={MIN_AUTO_REFRESH_INTERVAL_MINUTES}
            required
            aria-describedby="{id}-interval-hint {id}-interval-unit"
            class="SettingsDialog-number"
            bind:value={autoRefreshIntervalMinutes}
          />
          <span id="{id}-interval-unit">分</span>
        </div>
        <div class="SettingsDialog-item">
          <label for="{id}-links" class="SettingsDialog-label">ヘッダーのリンク集</label>
          <p id="{id}-links-hint" class="SettingsDialog-hint">
            <code>[ラベル](URL)</code>
            形式を改行区切りで指定できます。ラベルを空にすると、ファビコンだけを表示します。
          </p>
          <textarea
            id="{id}-links"
            aria-describedby="{id}-links-hint"
            class="SettingsDialog-textarea"
            bind:value={headerLinksText}></textarea>
        </div>
      </fieldset>
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
      /* hidden だとスクロールの基準になって、保存ボタンの行が下に固定されなくなるので clip にする */
      overflow: clip;
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

    /* 「表示」「エントリーの一覧」などのまとまり */
    .SettingsDialog-group {
      margin: 0;
      border: 0;
      padding: 0;
      min-width: 0;

      & + & {
        margin-top: calc(var(--line) * 1.5);
        border-top: 1px solid var(--color-line);
        padding-top: var(--line);
      }
    }

    .SettingsDialog-groupTitle {
      font-size: var(--fs-l);
      line-height: var(--lh-l);
      float: left;
      width: 100%;
      margin-bottom: calc(var(--line) * 0.75);
      padding: 0;
      font-weight: var(--fw-bold);

      & + * {
        clear: left;
      }
    }

    .SettingsDialog-item {
      font-size: var(--fs-m);
      line-height: var(--lh-m);
      margin-top: 0;
      margin-bottom: 0;

      & + & {
        margin-top: var(--line);
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
      padding: 0;
      font-weight: var(--fw-bold);
    }

    /* ラベルと入力欄の間に置く説明 */
    .SettingsDialog-hint {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      margin-top: calc(var(--line) * -0.25);
      margin-bottom: calc(var(--line) * 0.5);
      color: var(--color-text-muted);

      code {
        border-radius: 4px;
        padding: 0 0.3em;
        background-color: var(--color-surface-sub);
        font-family: var(--ff-mono);
      }
    }

    .SettingsDialog-number,
    .SettingsDialog-select,
    .SettingsDialog-textarea {
      font-size: var(--fs-m);
      line-height: var(--lh-m);
      box-sizing: border-box;
      border: 1px solid var(--color-line-strong);
      border-radius: var(--radius-control);
      padding: 0.3em 0.6em;
      background-color: var(--color-surface);
      font-family: inherit;
      color: var(--color-text);
    }

    .SettingsDialog-number {
      width: 5em;
      margin-right: 0.3em;

      &._wide {
        width: 7em;
      }
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
