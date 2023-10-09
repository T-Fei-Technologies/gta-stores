<script lang="ts">
  import { fly } from 'svelte/transition';
  import { Plus, Icon } from 'svelte-hero-icons';
  import { priceFormatter } from '$lib/utils/priceFormatter';

  import type { Part } from '$lib/types/Part';
  import { items } from '$lib/stores/items';

  export let part: Part;
  export let onAddItem: (part: Part, quantity?: number) => void;

  let showMobileQuantity = false;
  let quantity = 1;

  const onItemAdd = () => {
    const newQuantity = ($items.find(itemsPart => itemsPart.part.id === part.id)?.quantity ?? 0) + quantity;
    onAddItem(part, newQuantity);
    showMobileQuantity = false;
    quantity = 1;
  };
</script>

<div class="relative{showMobileQuantity ? ' h-28' : ''}">
  <button
    class="group flex items-center justify-between w-full gap-4 my-4 p-2 max-sm:hidden rounded cursor-pointer outline outline-0 hover:outline-2 hover:outline-offset-2 hover:outline-accent hover:text-accent"
    on:click={() => onAddItem(part)}
    title="Add {part.name} to worksheet"
  >
    <Icon src={Plus} size="24" class="w-0 group-hover:w-6 transition-all duration-150 ease-in-out" />
    <span class="text-left">
      <span class="flex-grow pointer-events-none text-left">{part.name}</span>
      <span class="flex flex-grow text-left text-xs opacity-75">
        {part.notes ?? ''}
      </span>
    </span>
    <span class="flex-grow pointer-events-none text-right">{priceFormatter.format(part.cost)}</span>
  </button>

  {#if showMobileQuantity}
    <div class="absolute inset-0 flex flex-col w-full bg-secondary text-secondary-content rounded-lg p-2 drop-shadow-2xl" in:fly={{ x:-20 }} out:fly={{ x:20 }}>
      <span class="text-left mb-2">
        <span class="flex-grow pointer-events-none text-left font-bold">{part.name}</span>
        <span class="flex flex-grow text-left text-xs opacity-75 capitalize">
          {part.notes ?? ''}
        </span>
      </span>
      <div class="flex justify-center gap-2">

        <button class="btn btn-error" on:click={() => showMobileQuantity = !showMobileQuantity}>&cross;</button>
        <button class="btn btn-primary" on:click={() => quantity = Math.max(0, quantity - 1)}>&minus;</button>
        <input
          type="number"
          class="w-14 text-center rounded-lg border border-secondary-content focus:border-accent focus:outline-0"
          min="0"
          value={quantity}
        />
        <button class="btn btn-primary" on:click={() => quantity++}>&plus;</button>
        <button class="btn btn-success" on:click={onItemAdd}>&check;</button>
      </div>
    </div>
  {:else}
    <button
      class="group flex items-center justify-between w-full gap-4 my-4 p-2 sm:hidden rounded cursor-pointer outline outline-0 hover:outline-2 hover:outline-offset-2 hover:outline-accent hover:text-accent"
      on:click={() => showMobileQuantity = !showMobileQuantity}
    >
    <span class="text-left">
      <span class="flex-grow pointer-events-none text-left">{part.name}</span>
      <span class="flex flex-grow text-left text-xs opacity-75">
        {part.notes ?? ''}
      </span>
    </span>
      <span class="flex-grow pointer-events-none text-right">{priceFormatter.format(part.cost)}</span>
    </button>
  {/if}
</div>