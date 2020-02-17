<script>
  import KEY_NAMES from "~/constants/keyNames"
  import createNullValueObject from "~/utils/createNullValueObject"
  import { entriesData } from "~/store/entries"
  import { autoRefresh, autoRefreshInterval, links } from "~/store/config"
  import Button from "~/elements/Button.svelte"
  import Icon from "~/elements/Icon.svelte"
  import Modal from "~/components/common/Modal.svelte"

  const removeAttrs = createNullValueObject([])

  let timer
  let autoRefreshActive
  let autoRefreshIntervalTime
  let modalShow = false
  let modalTrigger
  let closeButton
  let lastFocusable
  let form
  let autoRefreshIntervalInput
  let linksInput
  let linksText

  autoRefresh.subscribe(value => {
    autoRefreshActive = value

    if (value) {
      updateEntries()
    } else {
      clearTimeout(timer)
    }
  })

  autoRefreshInterval.subscribe(value => {
    autoRefreshIntervalTime = value * 60 * 1000
  })

  links.subscribe(value => {
    linksText = linksToText(value)
  })

  function updateEntries() {
    timer = setTimeout(() => {
      entriesData.update()
      updateEntries()
    }, autoRefreshIntervalTime)
  }

  function linksToText(arr) {
    return arr.reduce((result, link) => {
      result += `[${link.label}](${link.url})\n`
      return result
    }, "")
  }

  function toggleAutoRefresh(event) {
    event.preventDefault()
    autoRefresh.set(!autoRefreshActive)
  }

  function parseLinks(value) {
    const lines = value.split(/[\r\n]+/)
    return lines.reduce((result, line) => {
      const matches = line.match(/\[(.*?)\]\((.*?)\)/)
      if (matches) {
        result.push({
          label: matches[1],
          url: matches[2],
        })
      }
      return result
    }, [])
  }

  function onSubmit(event) {
    event.preventDefault()
    autoRefreshInterval.set(autoRefreshIntervalInput.value)
    links.set(linksInput.value)
  }

  function showModal(event) {
    event.preventDefault()
    modalShow = true
    requestAnimationFrame(() => {
      closeButton.focus()
    })
  }

  function hideModal(event) {
    event.preventDefault()
    closeModal()
  }

  function closeModal() {
    modalShow = false
    modalTrigger.focus()
  }

  function onKeydownModal(event) {
    if (event.key === KEY_NAMES.escape) {
      event.stopPropagation()
      closeModal()
    }
  }

  function onKeydownCloseButton(event) {
    const originalEvent = event.detail
    if (originalEvent.key === KEY_NAMES.tab && originalEvent.shiftKey) {
      originalEvent.preventDefault()
      originalEvent.stopPropagation()
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

<template>
  <div {...$$props} {...removeAttrs} class="{$$props.class || ''} AppSettings">
    <Button
      title="自動更新を{autoRefreshActive ? '停止する' : '有効にする'}"
      class="AppSettings-button"
      role="switch"
      aria-checked="{autoRefreshActive}"
      on:click="{toggleAutoRefresh}"
    >
      <Icon name="checkbox-checked" class="AppSettings-icon {autoRefreshActive ? '' : '_hide'}" />
      <Icon name="checkbox-outline" class="AppSettings-icon {autoRefreshActive ? '_hide' : ''}" />
      自動更新
    </Button>
    <Button class="AppSettings-button" bind:ref="{modalTrigger}" on:click="{showModal}">
      <Icon name="settings" class="AppSettings-icon" />
      設定
    </Button>
    <Modal
      show="{modalShow}"
      {lastFocusable}
      bind:closeButton
      on:modal:close="{hideModal}"
      on:closebutton:keydown="{onKeydownCloseButton}"
    >
      <form class="AppSettings-form" on:submit="{onSubmit}">
        <div class="AppSettings-body">
          <p class="AppSettings-item">
            <label for="autoRefreshInterval" class="AppSettings-label">エントリー一覧の自動更新間隔</label>
            <input
              type="number"
              id="autoRefreshInterval"
              value="{$autoRefreshInterval}"
              min="5"
              class="AppSettings-time"
              bind:this="{autoRefreshIntervalInput}"
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
            <textarea
              id="links"
              class="AppSettings-textarea"
              bind:this="{linksInput}"
              bind:value="{linksText}"
            ></textarea>
          </p>
        </div>
        <div class="AppSettings-footer">
          <Button
            type="submit"
            class="AppSettings-submit"
            bind:ref="{lastFocusable}"
            on:keydown="{onKeydownLastFocusable}"
          >
            設定を保存
          </Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<style lang="scss" global>
  .AppSettings {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: get-lines(0.25);
  }

  .AppSettings-button {
    @include spread-clickable-area(0);
    @include text(0);
    display: flex;
    align-items: center;
    position: relative;
    padding-right: $line-edge;
    padding-left: $line-edge;
    white-space: nowrap;
  }

  .AppSettings-icon {
    @include icon-size(0);
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
    padding: get-lines(1);
  }

  .AppSettings-footer {
    position: sticky;
    bottom: 0;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: var(--color-border-base);
    padding: get-lines(1);
    background-color: var(--color-bg-content);
  }

  .AppSettings-item {
    @include text(0);
    margin-top: 0;

    &:nth-last-child(n + 2) {
      margin-bottom: get-lines(1);
    }
  }

  .AppSettings-label {
    display: block;
    margin-bottom: get-lines(0.5);

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
    @include text(0);
    width: 3em;
  }

  .AppSettings-textarea {
    @include text(0);
    box-sizing: border-box;
    width: 100%;
    height: get-lines(5);
  }

  .AppSettings-submit {
    @include text(-1, false);
    @include spread-clickable-area;
    display: inline-block;
    position: relative;
    border-radius: 2px;
    padding: get-lines(0.5);
    background-color: var(--color-bg-blue);
    color: white;
    line-height: 1;
    text-decoration: none;
    vertical-align: bottom;
  }
</style>
