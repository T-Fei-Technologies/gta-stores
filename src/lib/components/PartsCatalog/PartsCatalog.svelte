<script lang="ts">
  import { fade } from 'svelte/transition';
  import { items } from '$lib/stores/items';
  import { appSettings } from '$lib/stores/appSettings';
  import PartsCategoryTabs from '$lib/components/PartsCatalog/PartsCategoryTabs.svelte';
  import PartListItem from '$lib/components/PartsCatalog/PartListItem.svelte';
  import type { WorksheetItem } from '$lib/types/WorksheetItem';
  import { sortByPartName } from '$lib/utils/sortByPartName';
  import {
    getPartsByCategory,
    getPartsBySubCategory,
  } from '$lib/utils/getPartsByCategory';
  import { getSubCategoriesFromParts } from '$lib/utils/getSubCategoriesFromParts';
  import type { Part } from '$lib/types/Part';

  let activeTab = $appSettings.categories[0];
  let activeSubCategory = 0;

  const onAddItem = (part: Part, quantity?: number) =>
    items.update((items) => {
      const itemIndex = items.findIndex((item) => item.part.id === part.id);

      if (itemIndex === -1 && quantity !== 0) {
        return [
          ...items,
          {
            part,
            quantity: quantity ?? 1,
          } as WorksheetItem,
        ];
      }

      const updatedItems = [...items];

      if (quantity === 0) {
        return updatedItems.filter((item) => item.part.id !== part.id);
      } else {
        updatedItems[itemIndex].quantity = quantity ?? updatedItems[itemIndex].quantity + 1;
      }

      return updatedItems;
    });

  $: partsByCategory = getPartsByCategory($appSettings.partsCatalog, activeTab);
  $: subCategories = getSubCategoriesFromParts(partsByCategory, $appSettings.subCategories);
  $: hasSubcategories = subCategories.length > 0;
</script>

<div class="rounded-lg flex flex-col p-6 bg-base-100/70 md:w-[450px]">
  <h1 class="text-2xl pb-4">{$appSettings.store.products_name ?? 'Products'}</h1>

  <div class="flex justify-center ">
    <PartsCategoryTabs bind:activeTab categories={$appSettings.categories} />
  </div>

  <section>
    {#if partsByCategory.length === 0}
      <div class="flex justify-center items-center h-32">
        <p class="text-base-content-secondary">No parts found.</p>
      </div>
    {:else if hasSubcategories}
      {#each subCategories as subCategory, i (subCategory.id)}
        <div class="collapse collapse-arrow bg-base-200/70 my-4" in:fade={{ duration: 150 }}>
          <input type="radio" name="subcategory-accordion-{i}" bind:group={activeSubCategory} value={i} />
          <div class="collapse-title">
            <h3 class="text-lg capitalize">{subCategory.name}</h3>
          </div>
          <div class="collapse-content">
            <div>
              {#each getPartsBySubCategory($appSettings.partsCatalog, subCategory) as part (part)}
                <PartListItem bind:part onAddItem={onAddItem} />
              {/each}
            </div>
          </div>
        </div>
      {/each}
    {:else}
      <div class="px-1" in:fade={{ duration: 250 }}>
        {#each partsByCategory.sort(sortByPartName) as part (part.id)}
          <PartListItem bind:part onAddItem={onAddItem} />
        {/each}
      </div>
    {/if}
  </section>
</div>
