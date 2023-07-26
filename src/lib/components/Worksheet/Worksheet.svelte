<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { Icon, Trash } from 'svelte-hero-icons';
  import { items } from '$lib/stores/items.ts';
  import { cubicOut } from 'svelte/easing';
  import WorkSheetListItem from '$lib/components/Worksheet/WorkSheetListItem.svelte';
  import WorkSheetTotals from '$lib/components/Worksheet/WorkSheetTotals.svelte';

  const onClearItems = () => {
    items.set([]);
  };
</script>

<div class="flex flex-col rounded-lg p-6 bg-base-100/70 md:w-[450px]">
    <div class="flex items-center justify-between pb-4">
      <h2 class="text-2xl">Worksheet</h2>
      <button
        title="Clear Worksheet"
        class="flex items-center gap-0 p-1 pl-2 group rounded cursor-pointer drop-shadow-2xl hover:text-accent"
        on:click={onClearItems}
      >
        <span class="w-0 mr-0 group-hover:w-10 group-hover:mr-1 overflow-hidden transition-all duration-150 ease-in-out">
          Clear&nbsp;
        </span>
        <Icon src={Trash} size="32" />
      </button>
    </div>
    <div class="flex flex-col justify-between h-full rounded pb-2">
      <div class="flex-grow">
        <div class="divider">Items</div>
        <div class="p-2">
          {#each $items as item, index (item.partId)}
            <WorkSheetListItem {item} index={index} />
          {/each}
          {#if $items.length === 0}
            <div
              class="flex items-center justify-center border-2 border-gray-400/70 border-dotted p-2 mb-2"
              in:fade|local={{ delay: 100 }}
              out:fly|local={{ y: 20, easing: cubicOut}}
            >
              Start adding items
            </div>
          {/if}
        </div>
      </div>
      <div class="flex flex-col items-end">
        <WorkSheetTotals />
      </div>
    </div>
</div>