<script>
  import "what-input"
  import AppHeader from "~/components/app-header/AppHeader"
  import AppBody from "~/components/app-body/AppBody"
</script>

<template>
  <AppHeader class="App-header" />
  <AppBody class="App-body" />
</template>

<style lang="scss" global>
  @import "./assets/styles/custom-properties";

  html {
    height: 100%;
    font-size: 100%;
  }

  body {
    display: grid;
    grid-template-rows: calc(#{get-lines(2)} + 1px) 1fr;
    row-gap: (get-lines(1) - rem($config-line-gap / 2));
    height: 100%;
    margin: 0;
    background-color: var(--color-bg-base);
    color: var(--color-text-base);
    font-family: var(--ff-sans);
  }

  .App-header {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--color-border-base);
    box-shadow: var(--shadow-base);
  }

  .App-body {
    min-height: 600px;
  }
</style>
