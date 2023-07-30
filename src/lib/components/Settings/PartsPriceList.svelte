<script lang="ts">
  import { fade } from 'svelte/transition';
  import { appSettings } from '$lib/stores/appSettings';
  import { PART_CATEGORIES } from '$lib/types/PartCategories';
  import type { Part } from '$lib/types/Part';
  import PartsPriceListItem from '$lib/components/Settings/PartsPriceListItem.svelte';
  import PartsCategoryTabs from '$lib/components/PartsCatalog/PartsCategoryTabs.svelte';
  import { saveSettings } from '$lib/appSettings/settingsHelpers';
  import { sortByPartName } from '$lib/utils/sortByPartName';
  import NewPartListItem from '$lib/components/Settings/NewPartListItem.svelte';
  import { items } from '$lib/stores/items';

  let activeTab = PART_CATEGORIES.COSMETICS;
  let partToAdd: Part | undefined;
  let partToDelete: { part: Part, type: PART_CATEGORIES, subtype?: string } | undefined;

  const onItemChange = (
    type: PART_CATEGORIES,
    subtype?: string,
  ) => async (part: Part, propToChange: keyof Part, value: string | number) => {
    if (type === PART_CATEGORIES.PERFORMANCE) {
      const partIndex = $appSettings.partsCatalog[type][subtype].findIndex((p) => p.id === part.id);
      $appSettings.partsCatalog[type][subtype][partIndex][propToChange] = value !== '' ? value : undefined;
    } else {
      const partIndex = ($appSettings.partsCatalog[type] as Part[]).findIndex((p) => p.id === part.id);
      $appSettings.partsCatalog[type][partIndex][propToChange] = value !== '' ? value : undefined;
    }

    appSettings.set($appSettings);
    await saveSettings();
  };

  const onConfirmItemDelete = (
    part: Part,
    type: PART_CATEGORIES,
    subtype?: string,
  ) => () => {
    partToDelete = { part, type, subtype };
    (document.getElementById('delete_part_modal') as HTMLDialogElement).showModal();
  };

  const onDeletePartModalClose = () => {
    (document.getElementById('delete_part_modal') as HTMLDialogElement).close();
    setTimeout(() => {
      partToDelete = undefined;
    }, 250);
  };

  const onDeleteItem = async () => {
    if (!partToDelete) {
      return;
    }

    // Remove the item from the worksheet if it's there
    $items = $items.filter((item) => item.partId !== partToDelete?.part.id);

    // Now remove it from the parts catalog
    if (partToDelete.type === PART_CATEGORIES.PERFORMANCE && partToDelete.subtype) {
      $appSettings.partsCatalog.performance[partToDelete.subtype] = $appSettings.partsCatalog.performance[partToDelete.subtype]
        .filter((part: Part) => part.id !== partToDelete?.part.id);
    }

    if (partToDelete.type !== PART_CATEGORIES.PERFORMANCE) {
      $appSettings.partsCatalog[partToDelete.type] = $appSettings.partsCatalog[partToDelete?.type]
        .filter((part: Part) => part.id !== partToDelete?.part.id);
    }

    // Update and save the app settings, then close the modal
    appSettings.set($appSettings);
    await saveSettings();
    onDeletePartModalClose();
  }

  const onAddPart = (type: PART_CATEGORIES, subtype?: string) => async (part: Part) => {
    // Generate a pseudo-random ID for the part plus the name minus any spaces
    part.id = Math.random().toString(36).slice(2, 9) + part.name.replace(/\s/g, '');

    partToAdd = part;

    if (type === PART_CATEGORIES.PERFORMANCE && subtype) {
      $appSettings.partsCatalog.performance[subtype].push(part);
    }
    if (type !== PART_CATEGORIES.PERFORMANCE) {
      $appSettings.partsCatalog[type].push(part);
    }
    appSettings.set($appSettings);
    await saveSettings();

    setTimeout(() => {
      partToAdd = undefined;
    }, 250);
  }
</script>

<div class="mb-4">
  <h3 class="mt-8 mb-2 text-xl">Custom Parts Pricing</h3>

  <section class="flex flex-col justify-between p-4 rounded-lg bg-neutral text-neutral-content">
    <div class="mb-4">
      <PartsCategoryTabs bind:activeTab categories={Object.keys($appSettings.partsCatalog)} />
    </div>

    <div class="flex-grow">
      {#if activeTab === 'performance'}
        {#each Object.keys($appSettings.partsCatalog.performance) as subtype}
          <div class="collapse collapse-arrow bg-base-200/70 mt-4 mb-8" in:fade={{ duration: 150 }}>
            <div class="card">
              <div class="card-body">
                <div class="card-title">
                  <h3 class="text-lg capitalize">{subtype}</h3>
                </div>
                <div>
                  {#each $appSettings.partsCatalog.performance[subtype] as part, i (part)}
                    <PartsPriceListItem
                      part={part}
                      index={i}
                      onItemChange={async () => onItemChange(activeTab, subtype)}
                      onItemDelete={onConfirmItemDelete(part, activeTab, subtype)}
                      isBeingAdded={partToAdd?.id === part.id}
                      isBeingDeleted={partToDelete?.part.id === part.id}
                    />
                  {/each}
                  <NewPartListItem
                    onAddPart={async () => onAddPart(activeTab, subtype)}
                    index={$appSettings.partsCatalog.performance[subtype].length}
                  />
                </div>
              </div>
            </div>
          </div>
        {/each}
      {:else}
        <div class="px-1" in:fade={{ duration: 150 }}>
          {#each $appSettings.partsCatalog[activeTab].sort(sortByPartName) as part, i (part)}
            <PartsPriceListItem
              part={part}
              index={i}
              onItemChange={async () => onItemChange(activeTab)}
              onItemDelete={onConfirmItemDelete(part, activeTab)}
              isBeingAdded={partToAdd?.id === part.id}
              isBeingDeleted={partToDelete?.part.id === part.id}
            />
          {/each}
          <NewPartListItem
            onAddPart={async () => onAddPart(activeTab)}
            index={$appSettings.partsCatalog[activeTab].length}
          />
        </div>
      {/if}
    </div>
  </section>
</div>

<dialog id="delete_part_modal" class="modal">
  <form method="dialog" class="modal-box">
    <h3 class="font-bold text-lg">Confirm Remove Part</h3>
    <p class="py-4">Are you sure you want to remove the part '{partToDelete?.part.name}'?</p>
    <p>This will also remove if from the worksheet if it is on it.</p>
    <p class="font-bold text-warning">There's no going back from this!</p>
    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button type="button" class="btn btn-error" on:click={async () => onDeleteItem}>Yes</button>
      <button class="btn" on:click={onDeletePartModalClose}>No</button>
    </div>
  </form>
</dialog>
