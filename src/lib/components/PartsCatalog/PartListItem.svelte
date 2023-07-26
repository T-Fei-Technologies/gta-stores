<script lang="ts">
  import { Plus, Icon } from 'svelte-hero-icons';
  import { priceFormatter } from '$lib/utils/priceFormatter.ts';

  import type { Part } from '$lib/types/Part';

  export let part: Part;
  export let onAddItem: (partId: string, type: string, subtype?: string) => void;
  export let type: string;
  export let subtype: string | undefined = undefined;
</script>

<button
  class="group flex items-center justify-between w-full gap-4 my-4 p-2 rounded cursor-pointer outline outline-0 hover:outline-2 hover:outline-offset-2 hover:outline-accent hover:text-accent"
  on:click={() => onAddItem(part.id, type, subtype)}
  title="Add {part.name} to worksheet"
>
  <Icon src={Plus} size="24" class="w-0 group-hover:w-6 transition-all duration-150 ease-in-out" />
  <span>
    <span class="flex-grow pointer-events-none text-left">{part.name}</span>
    <span class="flex flex-grow text-left text-xs opacity-75 capitalize">
      {part.notes ?? ''}
    </span>
  </span>
  <span class="flex-grow pointer-events-none text-right">{priceFormatter.format(part.cost)}</span>
</button>