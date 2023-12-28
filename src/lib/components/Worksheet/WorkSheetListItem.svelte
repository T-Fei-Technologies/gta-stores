<script lang="ts">
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Trash } from '@steeze-ui/heroicons';
  import { priceFormatter } from '$lib/utils/priceFormatter';
  import type { WorksheetItem } from '$lib/types/WorksheetItem';
  import { items } from '$lib/stores/items';
  import { appSettings } from '$lib/stores/appSettings';

  export let item: WorksheetItem;
  export let index: number;

  const updateQuantity = (itemId: string, quantity: number) => {
    items.update((items) => {
      const item = items.find((item) => item.part.id === itemId);
      if (item) {
        item.quantity = quantity;
      }
      return items;
    });
  };

  const removeItem = (itemId: string) => {
    items.update((items) => items.filter((item) => item.part.id !== itemId));
  };

  $: categoryName = $appSettings.categories.find(category => category.id === item.part?.category)?.name ?? '';
  $: subCategoryName = $appSettings.subCategories.find(subCategory => subCategory.id === item.part?.sub_category)?.name ?? '';
</script>

<div
  class="flex justify-between items-center group mb-2 gap-4 p-2 w-full rounded outline outline-0 hover:outline-2 hover:outline-offset-2 hover:outline-accent hover:text-accent"
  in:fly|local={{ x: -20, duration: 150, easing: cubicOut, delay: 50 }}
  out:fly|local={{ x: 20, duration: 150, easing: cubicOut }}
>
  <input
    type="number"
    id={`${item.part?.id}-quantity`}
    class="input input-bordered rounded-lg w-16 text-center px-1"
    title="Quantity of {item.part?.name}"
    value={item.quantity}
    tabindex={index + 1}
    on:keyup={(event) => updateQuantity(item.part?.id, Number(event.target.value))}
    on:click={(event) => updateQuantity(item.part?.id, Number(event.target.value))}
  />
  <span class="flex flex-col items-start justify-center">
    <span class="flex-grow text-left">{item.part?.name}</span>
    <span class="flex flex-grow text-left text-xs opacity-75">
      {categoryName}{item.part.sub_category ? ` - ${subCategoryName}` : ''}{item.part?.notes ? ` - ${item.part?.notes}` : ''}
    </span>
  </span>
  <span class="flex-grow text-right">{priceFormatter.format(item.part?.cost * item.quantity)}</span>
  <button title="Remove {item.part?.name} from {$appSettings.store.worksheet_name}" on:click={() => removeItem(item.part?.id)}>
    <Icon src={Trash} size="24" class="w-0 cursor-pointer group-hover:w-6 transition-all duration-150 ease-in-out pointer-events-none" />
  </button>
</div>
