<script lang="ts">
  import type { Part } from '$lib/types/Part';
  import { Icon, Plus } from 'svelte-hero-icons';

  export let onAddPart: (part: Part) => void;
  export let index: number;

  let addAttempted = false;

  let part: Part = {
    id: '',
    name: '',
    cost: 0,
    notes: '',
  };

  const isPartValid = () => {
    addAttempted = true;
    return (!(part.name === '' || part.cost < 0));
  };

  const addPart = () => {
    if (isPartValid()) {
      onAddPart(part);
      part = {
        id: '',
        name: '',
        cost: 0,
        notes: '',
      };
      clearAddAttempted();
    }
  };

  const clearAddAttempted = () => {
    addAttempted = false;
  };
</script>

<div class="flex flex-col w-full py-2">
  <div class="divider">Add New Part</div>
  <div class="flex justify-center items-end gap-4">
    <div class="flex form-control flex-grow">
      <label class="label" for={`${part.name}-name`}>
        <span class="label-text">Part Name</span>
        {#if addAttempted && part.name === ''}
          <span class="label-text-alt">Required</span>
        {/if}
      </label>
      <input
        type="text"
        id={`${part.name}-name`}
        class="input input-bordered rounded-lg w-full text-left px-4"
        class:input-error={addAttempted && part.name === ''}
        title="Name of the part"
        bind:value={part.name}
        tabindex={index + 1}
        placeholder="Awesome Part Name"
        on:input={clearAddAttempted}
      />
    </div>

    <div class="flex form-control">
      <label class="label" for={`${part.id}-cost`}>
        <span class="label-text">Price</span>
        {#if addAttempted && part.cost < 0}
          <span class="label-text-alt">&gt;0</span>
        {/if}
      </label>
      <input
        type="number"
        id={`${part.id}-cost`}
        class="input input-bordered rounded-lg w-24 text-center px-1"
        class:input-error={addAttempted && part.cost < 0}
        title="The price of the part/item"
        bind:value={part.cost}
        on:input={clearAddAttempted}
        min="0"
        tabindex={index + 1}
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
        bind:value={part.notes}
        on:input={clearAddAttempted}
        tabindex={index + 1}
      />
    </div>

    <button type="button" class="btn btn-neutral" title="Add Part" on:click={addPart}>
      <Icon src={Plus} size="24" />
    </button>
  </div>
</div>