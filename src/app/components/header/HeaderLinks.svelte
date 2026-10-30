<script>
  import { settings } from "~/store/settings.svelte.js"
  import Link from "~/elements/Link.svelte"
  import List from "~/elements/List.svelte"

  // 設定画面で登録した、ヘッダーのリンク集
  let { class: className = "", ...rest } = $props()

  // ラベルのないリンクはファビコンだけを表示するので、読み上げ用にドメイン名を使う
  function hostnameOf(url) {
    return URL.parse(url)?.hostname ?? url
  }
</script>

<div {...rest} class={[className, "HeaderLinks"]}>
  {#if settings.headerLinks.length}
    <nav aria-label="お気に入りリンク">
      <List class="HeaderLinks-list">
        <!-- 同じリンクを複数登録しても表示が壊れないよう、順番をキーにする -->
        {#each settings.headerLinks as link, index (index)}
          <li class="HeaderLinks-item">
            <Link url={link.url} class="HeaderLinks-link" title={link.label ? null : hostnameOf(link.url)}>
              <img src="https://www.google.com/s2/favicons?domain={link.url}" alt="" class="HeaderLinks-favicon" />
              {#if link.label}
                <span class="HeaderLinks-label">{link.label}</span>
              {:else}
                <span class="VisuallyHidden">{hostnameOf(link.url)}</span>
              {/if}
            </Link>
          </li>
        {/each}
      </List>
    </nav>
  {/if}
</div>

<style>
  :global {
    .HeaderLinks-list {
      display: flex;
      gap: calc(var(--line) * 0.25);
      max-width: 100%;
    }

    .HeaderLinks-item {
      display: flex;
      min-width: 0;
    }

    .HeaderLinks-link {
      font-size: var(--fs-s);
      line-height: var(--lh-s);
      display: flex;
      align-items: center;
      gap: 0.4em;
      border-radius: var(--radius-pill);
      padding: 0.2em 0.9em;
      overflow: hidden;
      background-color: var(--color-surface-sub);
      color: var(--color-text);
      white-space: nowrap;
      text-decoration: none;

      &:hover {
        background-color: var(--color-line-strong);
        color: var(--color-text);
      }
    }

    .HeaderLinks-favicon {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
    }

    .HeaderLinks-label {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
