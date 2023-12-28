<script lang="ts">
  import type { Category } from '$lib/types/Category';

  export let activeTab: Category;
  export let categories: Category[] = [];
</script>

<div role="tablist" class="tabs tabs-bordered max-sm:tabs-boxed">
  {#each categories as category (category.id)}
    <button
      class="tab max-sm:w-full max-sm:h-12 max-sm:my-1 max-sm:p-1 text-xl font-bold capitalize"
      class:tab-active={activeTab.id === category.id}
      on:click={() => activeTab = category}
      type="button"
      role="tab"
    >
      {category.name}
    </button>
  {/each}
</div>