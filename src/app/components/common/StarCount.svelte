<script>
  import { STAR_COLORS, describeStars } from "~/utils/describeStars"
  import Icon from "~/elements/Icon.svelte"

  // はてなスターの数を、色ごとの星のアイコンと数で表示する。スターがなければ何も表示しない
  // - stars: stars API の { total, colors }、または null
  let { stars, class: className = "", ...rest } = $props()

  const counts = $derived(
    stars
      ? STAR_COLORS.filter(({ key }) => stars.colors[key]).map(({ key }) => ({ key, count: stars.colors[key] }))
      : [],
  )
  const description = $derived(stars ? describeStars(stars) : "")
</script>

{#if stars}
  <span {...rest} class={[className, "StarCount"]} title={description}>
    <!-- 色は見た目だけでは伝わらないので、読み上げには色の名前と数を文字で伝える -->
    <span class="VisuallyHidden">{description}</span>
    {#each counts as { key, count } (key)}
      <span class="StarCount-color _{key}" aria-hidden="true">
        <Icon name="star" class="StarCount-icon" />
        {count}
      </span>
    {/each}
  </span>
{/if}

<style>
  :global {
    .StarCount {
      font-size: var(--fs-xs);
      line-height: var(--lh-xs);
      display: inline-flex;
      align-items: center;
      gap: 0.5em;
      color: var(--color-text-sub);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }

    .StarCount-color {
      display: inline-flex;
      align-items: center;
      gap: 0.1em;

      &._yellow {
        --star-color: var(--color-star-yellow);
      }

      &._green {
        --star-color: var(--color-star-green);
      }

      &._red {
        --star-color: var(--color-star-red);
      }

      &._blue {
        --star-color: var(--color-star-blue);
      }

      &._purple {
        --star-color: var(--color-star-purple);
      }
    }

    .StarCount-icon {
      width: 1.25em;
      height: 1.25em;
      color: var(--star-color);
    }
  }
</style>
