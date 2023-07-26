<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import type { Part } from '$lib/types/Part';
  import { Icon, Trash } from 'svelte-hero-icons';

  export let part: Part;
  export let index: number;
  export let isBeingAdded: boolean;
  export let isBeingDeleted: boolean;
  export let onItemChange: (part: Part, prop: keyof Part, value: string | number) => void;
  export let onItemDelete: () => void;

  const flyAnim = (node, args) => isBeingAdded ? fly(node, { ...args, delay: 0 }) : {};

  const fadeAnim = (node, args) => isBeingDeleted ? fade(node, args) : {};
</script>

<div
  class="group flex justify-between items-end w-full gap-4 py-2"
  in:flyAnim={{ y: -40, duration: 250, delay: 50 * index }}
  out:fadeAnim={{ duration: 500, delay: 100 }}>
  <div class="flex form-control flex-grow">
    <label class="label" for={`${part.name}-name`}>
      <span class="label-text">Part Name</span>
    </label>
    <input
      type="text"
      id={`${part.name}-name`}
      class="input input-bordered rounded-lg w-full text-left px-4"
      title="Name of the part"
      value={part.name}
      tabindex={index + 1}
      on:keyup={(event) => onItemChange(part, 'name', event.target.value)}
    />
  </div>

  <div class="flex form-control">
    <label class="label" for={`${part.id}-cost`}>
      <span class="label-text">Price</span>
    </label>
    <input
      type="number"
      id={`${part.id}-cost`}
      class="input input-bordered rounded-lg w-24 text-center px-1"
      title="The price of the part/item"
      value={part.cost}
      tabindex={index + 1}
      on:keyup={(event) => onItemChange(part, 'cost', event.target.value)}
    />
  </div>

  <div class="flex form-control flex-grow">
    <label class="label" for={`${part.notes}-notes`}>
      <span class="label-text">Notes</span>
      <span class="label-text-alt">Optional</span>
    </label>
    <input
      type="text"
      id={`${part.notes}-notes`}
      class="input input-bordered rounded-lg w-full text-left px-4 flex-grow"
      title="Notes about the part/item"
      value={part.notes || ''}
      tabindex={index + 1}
      on:keyup={(event) => onItemChange(part, 'notes', event.target.value)}
    />
  </div>

  <button type="button" class="btn btn-neutral" title={`Delete ${part.name}`} on:click={onItemDelete}>
    <Icon src={Trash} size="24" />
  </button>
</div>