<script>
  import createNullValueObject from "~/utils/createNullValueObject"

  let display
  let when
  let message = "謎のエラーが発生しました"
  export { display, when, message }

  const removeAttrs = createNullValueObject(["display", "when", "message"])

  let timing
  let errorTitle = "エラーが発生しました"

  switch(when) {
    case "connection":
      timing = "APIへの接続エラー"
      break
    case "api":
      timing = "APIからエラーが返されました"
      break
    default:
      timing = "不明なエラー"
  }

  switch (display) {
    case "entries":
      errorTitle = "一覧取得の際に" + errorTitle
      break
    case "detail":
      errorTitle = "詳細情報取得の際に" + errorTitle
      break
  }
</script>

<template>
  <section {...$$props} {...removeAttrs} class="{$$props.class || ''} FetchError">
    {#if display === 'entries'}
      <h4 class="FetchError-title">{errorTitle}</h4>
    {:else}
      <h3 class="FetchError-title">{errorTitle}</h3>
    {/if}
    <dl class="FetchError-details">
      <dt class="FetchError-label">状況</dt>
      <dd class="FetchError-description">{timing}</dd>
      <dt class="FetchError-label">エラーメッセージ</dt>
      <dd class="FetchError-description">
        <pre class="FetchError-message">{message}</pre>
      </dd>
    </dl>
  </section>
</template>

<style lang="scss" global>
  .FetchError {
  }

  .FetchError-title {
    @include text(1);
    margin: 0;
    font-weight: var(--fw-bold);

    &::before {
      margin-right: 0.25em;
      content: "\26a0";
    }
  }

  .FetchError-details {
    @include text(0);
    margin-top: 0;
    margin-bottom: 0;
  }

  .FetchError-label {
    margin-top: get-lines(1);
    margin-bottom: get-lines(0.5);
    font-weight: var(--fw-bold);
  }

  .FetchError-description {
    margin-left: get-lines(1);
  }

  .FetchError-message {
    margin: 0;
    font-size: inherit;
    font-family: var(--ff-mono);
    white-space: pre-wrap;
    word-break: break-all;
  }
</style>
