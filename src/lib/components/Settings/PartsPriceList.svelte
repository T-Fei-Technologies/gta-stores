<script lang="ts">
  import { fade } from 'svelte/transition';
  import { appSettings } from '$lib/stores/appSettings';
  import type { Part } from '$lib/types/Part';
  import PartsPriceListItem from '$lib/components/Settings/PartsPriceListItem.svelte';
  import PartsCategoryTabs from '$lib/components/PartsCatalog/PartsCategoryTabs.svelte';
  import { sortByPartName } from '$lib/utils/sortByPartName';
  import { items } from '$lib/stores/items';
  import {
    getPartsByCategory,
    getPartsBySubCategory,
  } from '$lib/utils/getPartsByCategory';

  let activeTab = $appSettings.categories[0];
  let partToAdd: Part | undefined;
  let partToDelete: Part | undefined;

  const onItemChange = (
  ) => async (part: Part, propToChange: keyof Part, value: string | number) => {
    // const partIndex = $appSettings.partsCatalog.findIndex(p => p.id === part.id);
    // $appSettings.partsCatalog[partIndex][propToChange] = value !== '' ? value : undefined;
  };

  const onConfirmItemDelete = (part: Part) => () => {
    partToDelete = part;
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
    $items = $items.filter((item) => item.partId !== partToDelete?.id);

    // Now remove it from the parts catalog
    // $appSettings.partsCatalog = $appSettings.partsCatalog.filter((part: Part) => part.id !== partToDelete?.id);

    // Update and save the app settings, then close the modal
    onDeletePartModalClose();
  }

  const onAddPart = () => async (part: Part) => {
    // partToAdd = part;
    //
    // if (type === PART_CATEGORIES.PERFORMANCE && subtype) {
    //   $appSettings.partsCatalog.performance[subtype].push(part);
    // }
    // if (type !== PART_CATEGORIES.PERFORMANCE) {
    //   $appSettings.partsCatalog[type].push(part);
    // }
    // appSettings.set($appSettings);
    // saveAppSettings();
    // await saveManagementSettings();
    //
    // setTimeout(() => {
    //   partToAdd = undefined;
    // }, 250);
  }

  $: partsByCategory = getPartsByCategory($appSettings.partsCatalog, activeTab);
  $: hasSubcategories = getPartsByCategory($appSettings.partsCatalog, activeTab).some(part => !!part.sub_category);
  $: subCategories = getPartsByCategory($appSettings.partsCatalog, activeTab).filter(part => !!part.sub_category);
</script>

<div class="mb-4">

  <section class="flex flex-col justify-between p-4 pt-0 mt-8 rounded-lg bg-base-100/70 text-base-content drop-shadow-2xl">
    <h3 class="my-4 text-2xl">Custom Parts Pricing</h3>
    <div class="mb-4">
      <PartsCategoryTabs bind:activeTab categories={$appSettings.categories} />
    </div>

    <div class="flex-grow">
      {#if partsByCategory.length === 0}
        <div class="flex flex-col items-center justify-center h-full">
          <p class="text-2xl">No parts found</p>
          <p class="text-lg">Add a new part to get started</p>
        </div>
      {:else if hasSubcategories}
        {#each subCategories as subCategory}
          <div class="collapse collapse-arrow bg-base-200/70 mt-4 mb-8" in:fade={{ duration: 150 }}>
            <div class="card">
              <div class="card-body">
                <div class="card-title">
                  <h3 class="text-lg capitalize">{subCategory}</h3>
                </div>
                <div>
                  {#each getPartsBySubCategory($appSettings.partsCatalog, subCategory) as part, i (part)}
                    <PartsPriceListItem
                      part={part}
                      index={i}
                      onItemDelete={onConfirmItemDelete(part)}
                      isBeingAdded={partToAdd?.id === part.id}
                      isBeingDeleted={partToDelete?.id === part.id}
                    />
                  {/each}
<!--                  <NewPartListItem-->
<!--                    onAddPart={debounceEvent(onAddPart(activeTab, subtype), SETTINGS_DEBOUNCE_MS)}-->
<!--                    index={$appSettings.partsCatalog.performance[subtype].length}-->
<!--                  />-->
                </div>
              </div>
            </div>
          </div>
        {/each}
      {:else}
        <div class="px-1" in:fade={{ duration: 150 }}>
          {#each partsByCategory.sort(sortByPartName) as part, i (part)}
            <PartsPriceListItem
              part={part}
              index={i}
              onItemDelete={onConfirmItemDelete(part)}
              isBeingAdded={partToAdd?.id === part.id}
              isBeingDeleted={partToDelete?.id === part.id}
            />
          {/each}
<!--          <NewPartListItem-->
<!--            onAddPart={debounceEvent(onAddPart, SETTINGS_DEBOUNCE_MS)}-->
<!--            index={$appSettings.partsCatalog.length}-->
<!--          />-->
        </div>
      {/if}
    </div>
  </section>
</div>

<dialog id="delete_part_modal" class="modal">
  <form method="dialog" class="modal-box">
    <h3 class="font-bold text-lg">Confirm Remove Part</h3>
    <p class="py-4">Are you sure you want to remove the part '{partToDelete?.name}'?</p>
    <p>This will also remove if from the worksheet if it is on it.</p>
    <p class="font-bold text-warning">There's no going back from this!</p>
    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button type="button" class="btn btn-error" on:click={async () => onDeleteItem}>Yes</button>
      <button class="btn" on:click={onDeletePartModalClose}>No</button>
    </div>
  </form>
</dialog>
