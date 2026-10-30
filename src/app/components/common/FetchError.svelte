<script>
  const CAUSE_LABELS = {
    connection: "APIへの接続エラー",
    api: "APIからエラーが返されました",
  }

  // APIからデータを取得できなかったときの表示
  // - cause: "connection"（APIに接続できなかった）か "api"（APIがエラーを返した）
  // - headingLevel: 見出しのレベル。置く場所の見出しの構造に合わせる
  let {
    title,
    cause,
    message = "謎のエラーが発生しました",
    headingLevel = 3,
    class: className = "",
    ...rest
  } = $props()
</script>

<section {...rest} class={[className, "FetchError"]}>
  <svelte:element this={`h${headingLevel}`} class="FetchError-title">{title}</svelte:element>
  <dl class="FetchError-details">
    <dt class="FetchError-label">状況</dt>
    <dd class="FetchError-description">{CAUSE_LABELS[cause] ?? "不明なエラー"}</dd>
    <dt class="FetchError-label">エラーメッセージ</dt>
    <dd class="FetchError-description">
      <pre class="FetchError-message">{message}</pre>
    </dd>
  </dl>
</section>

<style>
  :global {
    .FetchError-title {
      font-size: var(--fs-m);
      line-height: var(--lh-m);
      margin: 0;
      color: var(--color-error);
      font-weight: var(--fw-bold);

      /* 警告の記号は飾りなので、読み上げない */
      &::before {
        margin-right: 0.25em;
        content: "\26a0" / "";
      }
    }

    .FetchError-details {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      margin-top: 0;
      margin-bottom: 0;
    }

    .FetchError-label {
      margin-top: calc(var(--line) * 0.75);
      margin-bottom: calc(var(--line) * 0.25);
      color: var(--color-text-sub);
      font-weight: var(--fw-bold);
    }

    .FetchError-description {
      margin-left: 0;
    }

    .FetchError-message {
      margin: 0;
      border-radius: var(--radius-control);
      padding: calc(var(--line) * 0.4) calc(var(--line) * 0.5);
      background-color: var(--color-surface-sub);
      font-size: inherit;
      font-family: var(--ff-mono);
      white-space: pre-wrap;
      word-break: break-all;
    }
  }
</style>
