<script>
  import { viewState } from "~/store/viewState.svelte.js"
  import Button from "~/elements/Button.svelte"
  import Icon from "~/elements/Icon.svelte"

  let { heading, class: className = "", ...rest } = $props()
</script>

<header {...rest} class={[className, "BookmarksContainerHeader"]}>
  <h3 class="BookmarksContainerHeader-heading">{heading}</h3>
  <div class="BookmarksContainerHeader-tools">
    <Button
      title="コメントのないブックマークも表示する"
      class="BookmarksContainerHeader-button _filter"
      role="switch"
      aria-checked={viewState.includeBookmarksWithoutComment}
      onclick={() => (viewState.includeBookmarksWithoutComment = !viewState.includeBookmarksWithoutComment)}
    >
      <Icon
        name="checkbox-checked"
        class="BookmarksContainerHeader-icon {viewState.includeBookmarksWithoutComment ? '_show' : '_hide'}"
      />
      <Icon
        name="checkbox-outline"
        class="BookmarksContainerHeader-icon {viewState.includeBookmarksWithoutComment ? '_hide' : '_show'}"
      />
      全ブックマーク表示
    </Button>
    <Button
      title="ブックマーク日時が古い順に並び替える"
      class="BookmarksContainerHeader-button _sort"
      role="switch"
      aria-checked={viewState.showOldestBookmarksFirst}
      onclick={() => (viewState.showOldestBookmarksFirst = !viewState.showOldestBookmarksFirst)}
    >
      <Icon
        name="checkbox-checked"
        class="BookmarksContainerHeader-icon {viewState.showOldestBookmarksFirst ? '_show' : '_hide'}"
      />
      <Icon
        name="checkbox-outline"
        class="BookmarksContainerHeader-icon {viewState.showOldestBookmarksFirst ? '_hide' : '_show'}"
      />
      古い順で表示
    </Button>
  </div>
</header>

<style>
  :global {
    .BookmarksContainerHeader {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: calc(var(--line) * 0.6) calc(var(--line) * 0.75) calc(var(--line) * 0.4);
    }

    .BookmarksContainerHeader-heading {
      font-size: var(--fs-l);
      line-height: var(--lh-l);
      margin: 0;
      font-weight: var(--fw-bold);
    }

    .BookmarksContainerHeader-tools {
      display: flex;
      gap: calc(var(--line) * 0.25);
    }

    .BookmarksContainerHeader-button {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: flex;
      align-items: center;
      gap: 0.3em;
      border-radius: var(--radius-pill);
      padding: 0.2em 0.7em;
      color: var(--color-text-sub);

      &:hover {
        background-color: var(--color-surface-sub);
        color: var(--color-text);
      }
    }

    .BookmarksContainerHeader-icon {
      width: calc(var(--fs-s) * var(--lh-s));
      height: calc(var(--fs-s) * var(--lh-s));

      &._hide {
        display: none;
      }
    }
  }
</style>
