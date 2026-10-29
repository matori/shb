<script>
  const TIMINGS = {
    connection: "APIへの接続エラー",
    api: "APIからエラーが返されました",
  }

  const TITLE_PREFIXES = {
    entries: "一覧取得の際に",
    detail: "詳細情報取得の際に",
  }

  let { display, when, message = "謎のエラーが発生しました", class: className = "", ...rest } = $props()

  const timing = $derived(TIMINGS[when] ?? "不明なエラー")
  const errorTitle = $derived(`${TITLE_PREFIXES[display] ?? ""}エラーが発生しました`)
</script>

<section {...rest} class={[className, "FetchError"]}>
  <svelte:element this={display === "entries" ? "h4" : "h3"} class="FetchError-title">{errorTitle}</svelte:element>
  <dl class="FetchError-details">
    <dt class="FetchError-label">状況</dt>
    <dd class="FetchError-description">{timing}</dd>
    <dt class="FetchError-label">エラーメッセージ</dt>
    <dd class="FetchError-description">
      <pre class="FetchError-message">{message}</pre>
    </dd>
  </dl>
</section>

<style>
  :global {
    .FetchError {
    }

    .FetchError-title {
      font-size: var(--fs-l);
      line-height: var(--lh-l);
      margin: 0;
      font-weight: var(--fw-bold);

      &::before {
        margin-right: 0.25em;
        content: "\26a0";
      }
    }

    .FetchError-details {
      font-size: var(--fs-m);
      line-height: var(--lh-m);
      margin-top: 0;
      margin-bottom: 0;
    }

    .FetchError-label {
      margin-top: var(--line);
      margin-bottom: calc(var(--line) * 0.5);
      font-weight: var(--fw-bold);
    }

    .FetchError-description {
      margin-left: var(--line);
    }

    .FetchError-message {
      margin: 0;
      font-size: inherit;
      font-family: var(--ff-mono);
      white-space: pre-wrap;
      word-break: break-all;
    }
  }
</style>
