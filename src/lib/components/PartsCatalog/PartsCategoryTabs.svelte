<script lang="ts">
  export let activeTab: string;
  export let categories: string[] = [];
</script>

<div class="tabs">
  {#each categories as category}
    <button
      class="tab tab-bordered text-xl font-bold capitalize"
      class:tab-active={activeTab === category}
      on:click={() => activeTab = category}
      type="button"
    >
      {category}
    </button>
  {/each}
</div>