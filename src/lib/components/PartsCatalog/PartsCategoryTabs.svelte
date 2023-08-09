<script lang="ts">
  export let activeTab: string;
  export let categories: string[] = [];
</script>

<div class="tabs">
  {#each categories as category}
    <button
      class="tab tab-bordered max-sm:w-full max-sm:h-12 max-sm:my-1 max-sm:tabs-boxed max-sm:p-1 text-xl font-bold capitalize"
      class:tab-active={activeTab === category}
      on:click={() => activeTab = category}
      type="button"
    >
      {category}
    </button>
  {/each}
</div>