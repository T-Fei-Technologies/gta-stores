<script lang="ts">
  import { fade } from 'svelte/transition';
  import { items } from '$lib/stores/items.ts';
  import { appSettings } from '$lib/stores/appSettings';
  import PartsCategoryTabs from '$lib/components/PartsCatalog/PartsCategoryTabs.svelte';
  import PartListItem from '$lib/components/PartsCatalog/PartListItem.svelte';
  import { PART_CATEGORIES } from '$lib/types/PartCategories';
  import type { WorksheetItem } from '$lib/types/WorksheetItem';
  import { sortByPartName } from '$lib/utils/sortByPartName';

  let upgradeGroups = 0;
  let activeTab = Object.keys($appSettings.partsCatalog)[0];

  const onAddItem = (partId: string, type: string, subtype?: string) =>
    items.update((items) => {
      const itemIndex = items.findIndex((item) => item.partId === partId);

      if (itemIndex === -1) {
        return [
          ...items,
          {
            partId,
            type,
            subtype,
            quantity: 1
          } as WorksheetItem,
        ];
      }

      const updatedItems = [...items];
      updatedItems[itemIndex].quantity += 1;

      return updatedItems;
    });
</script>

<div class="rounded-lg flex flex-col p-6 bg-base-100/70 md:w-[450px]">
  <h1 class="text-2xl pb-4">Parts Catalog</h1>

  <div class="flex justify-center">
    <PartsCategoryTabs bind:activeTab categories={Object.values(PART_CATEGORIES)} />
  </div>

  <section>
    {#if activeTab === 'performance'}
      {#each Object.keys($appSettings.partsCatalog.performance) as subtype, i}
        <div class="collapse collapse-arrow bg-base-200/70 my-4" in:fade={{ duration: 150 }}>
          <input type="radio" name="upgrade-accordion" bind:group={upgradeGroups} value={i} />
          <div class="collapse-title">
            <h3 class="text-lg capitalize">{subtype}</h3>
          </div>
          <div class="collapse-content">
            <div>
              {#each $appSettings.partsCatalog.performance[subtype] as part}
                <PartListItem bind:part type={activeTab} onAddItem={onAddItem} subtype={subtype} />
              {/each}
            </div>
          </div>
        </div>
      {/each}
    {:else}
      <div class="px-1" in:fade={{ duration: 250 }}>
        {#each $appSettings.partsCatalog[activeTab].sort(sortByPartName) as part}
          <PartListItem bind:part type={activeTab} onAddItem={onAddItem} />
        {/each}
      </div>
    {/if}
  </section>
</div>