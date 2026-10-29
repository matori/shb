<script>
  import KEY_NAMES from "~/constants/keyNames"
  import { entriesData } from "~/store/entries"
  import { autoRefresh, autoRefreshInterval, links } from "~/store/config"
  import Button from "~/elements/Button.svelte"
  import Icon from "~/elements/Icon.svelte"
  import Modal from "~/components/common/Modal.svelte"

  let { class: className = "", ...rest } = $props()

  let modalShow = $state(false)
  let modalTrigger = $state()
  let closeButton = $state()
  let lastFocusable = $state()
  let autoRefreshIntervalInput = $state()
  let linksText = $state("")

  const autoRefreshIntervalTime = $derived($autoRefreshInterval * 60 * 1000)

  $effect(() => {
    if (!$autoRefresh) {
      return
    }
    let timer
    function updateEntries() {
      timer = setTimeout(() => {
        entriesData.update()
        updateEntries()
      }, autoRefreshIntervalTime)
    }
    updateEntries()
    return () => clearTimeout(timer)
  })

  $effect.pre(() => {
    linksText = linksToText($links)
  })

  function linksToText(arr) {
    return arr.reduce((result, link) => {
      result += `[${link.label}](${link.url})\n`
      return result
    }, "")
  }

  function toggleAutoRefresh(event) {
    event.preventDefault()
    autoRefresh.set(!$autoRefresh)
  }

  function onSubmit(event) {
    event.preventDefault()
    autoRefreshInterval.set(autoRefreshIntervalInput.value)
    links.set(linksText)
  }

  function showModal(event) {
    event.preventDefault()
    modalShow = true
    requestAnimationFrame(() => {
      closeButton.focus()
    })
  }

  function closeModal() {
    modalShow = false
    modalTrigger.focus()
  }

  function onKeydownCloseButton(event) {
    if (event.key === KEY_NAMES.tab && event.shiftKey) {
      event.preventDefault()
      event.stopPropagation()
      lastFocusable.focus()
    }
  }

  function onKeydownLastFocusable(event) {
    if (event.key === KEY_NAMES.tab && !event.shiftKey) {
      event.preventDefault()
      event.stopPropagation()
      closeButton.focus()
    }
  }
</script>

<div {...rest} class={[className, "AppSettings"]}>
  <Button
    title="自動更新を{$autoRefresh ? '停止する' : '有効にする'}"
    class="AppSettings-button"
    role="switch"
    aria-checked={$autoRefresh}
    onclick={toggleAutoRefresh}
  >
    <Icon name="checkbox-checked" class="AppSettings-icon {$autoRefresh ? '' : '_hide'}" />
    <Icon name="checkbox-outline" class="AppSettings-icon {$autoRefresh ? '_hide' : ''}" />
    自動更新
  </Button>
  <Button class="AppSettings-button" bind:ref={modalTrigger} onclick={showModal}>
    <Icon name="settings" class="AppSettings-icon" />
    設定
  </Button>
  <Modal show={modalShow} bind:closeButton onclose={closeModal} onclosebuttonkeydown={onKeydownCloseButton}>
    <form class="AppSettings-form" onsubmit={onSubmit}>
      <div class="AppSettings-body">
        <p class="AppSettings-item">
          <label for="autoRefreshInterval" class="AppSettings-label">エントリー一覧の自動更新間隔</label>
          <input
            type="number"
            id="autoRefreshInterval"
            value={$autoRefreshInterval}
            min="5"
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
        <Button type="submit" class="AppSettings-submit" bind:ref={lastFocusable} onkeydown={onKeydownLastFocusable}>
          設定を保存
        </Button>
      </div>
    </form>
  </Modal>
</div>

<style>
  :global {
    .AppSettings {
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: calc(var(--line) * 0.25);
    }

    .AppSettings-button {
      &::before {
        position: absolute;
        inset: 0;
        content: "";
        box-shadow: 0 0 2px 1px var(--color-text-blue);
        opacity: 0;
      }

      &:hover::before {
        opacity: 1;
      }
      font-size: var(--fs-m);
      line-height: var(--lh-m);
      display: flex;
      align-items: center;
      position: relative;
      padding-right: var(--line-edge);
      padding-left: var(--line-edge);
      white-space: nowrap;
    }

    .AppSettings-icon {
      width: var(--line);
      height: var(--line);
      margin-right: 0.25em;

      &._hide {
        display: none;
      }
    }

    .AppSettings-form {
      position: relative;
      background-color: var(--color-bg-content);
      min-width: calc(var(--content-min-width) * 0.8);
    }

    .AppSettings-body {
      padding: var(--line);
    }

    .AppSettings-footer {
      position: sticky;
      bottom: 0;
      border-top-width: 1px;
      border-top-style: solid;
      border-top-color: var(--color-border-base);
      padding: var(--line);
      background-color: var(--color-bg-content);
    }

    .AppSettings-item {
      font-size: var(--fs-m);
      line-height: var(--lh-m);
      margin-top: 0;

      &:nth-last-child(n + 2) {
        margin-bottom: var(--line);
      }
    }

    .AppSettings-label {
      display: block;
      margin-bottom: calc(var(--line) * 0.5);

      code {
        border-width: 1px;
        border-style: solid;
        border-color: var(--color-border-base);
        border-radius: 2px;
        padding-right: 0.25em;
        padding-left: 0.25em;
        background-color: var(--color-bg-base);
        font-family: monospace, monospace;
      }
    }

    .AppSettings-time {
      font-size: var(--fs-m);
      line-height: var(--lh-m);
      width: 3em;
    }

    .AppSettings-textarea {
      font-size: var(--fs-m);
      line-height: var(--lh-m);
      box-sizing: border-box;
      width: 100%;
      height: calc(var(--line) * 5);
    }

    .AppSettings-submit {
      font-size: var(--fs-s);
      &::before {
        position: absolute;
        inset: calc(var(--line-edge) * -1);
        content: "";
        box-shadow: 0 0 2px 1px var(--color-text-blue);
        opacity: 0;
      }

      &:hover::before {
        opacity: 1;
      }
      display: inline-block;
      position: relative;
      border-radius: 2px;
      padding: calc(var(--line) * 0.5);
      background-color: var(--color-bg-blue);
      color: white;
      line-height: 1;
      text-decoration: none;
      vertical-align: bottom;
    }
  }
</style>
