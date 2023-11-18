<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { Icon, Trash, XMark } from 'svelte-hero-icons';
  import { items } from '$lib/stores/items';
  import { cubicOut } from 'svelte/easing';
  import WorkSheetListItem from '$lib/components/Worksheet/WorkSheetListItem.svelte';
  import WorkSheetTotals from '$lib/components/Worksheet/WorkSheetTotals.svelte';
  import { appSettings } from '$lib/stores/appSettings';

  export let closeDrawer: () => void;

  let magicNumber = '';
  let label = '';

  const onClearItems = () => {
    items.set([]);
    closeDrawer();
  };
</script>

<div class="flex flex-col rounded-lg p-6 bg-base-100 md:bg-base-100/70 md:w-[450px]">
  <div class="flex items-center justify-between pb-4">
    <h2 class="text-2xl">{$appSettings.store.worksheet_name}</h2>
    <button
      title="Clear {$appSettings.store.worksheet_name}"
      class="btn btn-ghost flex items-center gap-0 p-1 pl-2 group rounded cursor-pointer drop-shadow-2xl"
      on:click={onClearItems}
    >
      <span class="flex items-center md:w-0 mr-0 md:group-hover:w-12 group-hover:mr-1 overflow-hidden transition-all duration-150 ease-in-out">
        Clear&nbsp;
        <Icon src={Trash} size="32" class="md:hidden" />
      </span>
      <Icon src={Trash} size="32" class="hidden md:block" />
    </button>
  </div>
  <div class="flex flex-col justify-between h-full rounded pb-2">
    <div class="form-control">
      <label class="label" for="magic-number">
        <span class="label-text">Magic Number</span>
      </label>
      <input type="text" id="magic-number" class="input input-bordered mb-2" placeholder="Customer's Magic Number" bind:value={magicNumber} />
    </div>
    <div class="form-control">
      <label class="label" for="label">
        <span class="label-text">Mech Name</span>
      </label>
      <input type="text" id="label" class="input input-bordered mb-2" placeholder="This appears on the billing" bind:value={label} />
    </div>
    <div class="flex flex-col flex-grow">
      <div class="divider">Items</div>
      <div class="p-2 flex-grow overflow-y-hidden overflow-x-hidden">
        {#each $items as item, index (item.part.id)}
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
      <WorkSheetTotals {magicNumber} {label} />
    </div>
  </div>
  <label for="mobile-drawer" class="btn btn-outline btn-accent self-end sm:hidden hover:text-accent">
    Close&nbsp;
    <Icon src={XMark} size="32" />
  </label>
</div>
