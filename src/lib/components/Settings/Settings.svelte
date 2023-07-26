<script lang="ts">
  import { loadSettings } from '$lib/appSettings/settingsHelpers';
  import MarkupAdjustments from '$lib/components/Settings/MarkupAdjustments.svelte';
  import PartsPriceList from '$lib/components/Settings/PartsPriceList.svelte';

  const clearStorage = () => {
    localStorage.clear();
    loadSettings();
  };
</script>

<dialog id="settings_modal" class="modal">
  <form method="dialog" class="modal-box flex flex-col rounded-lg overflow-hidden px-0 pb-4 max-w-5xl max-sm:max-w-full max-h-full">
    <div class="flex flex-nowrap items-center justify-between w-full px-5">
      <h1 class="text-2xl flex-grow">Settings</h1>
      <button type="button" class="btn btn-sm btn-circle btn-ghost" onClick="settings_modal.close()">✕</button>
    </div>

    <div class="h-4/5 px-6 my-4 self-stretch flex-grow overflow-y-auto overscroll-contain">
      <MarkupAdjustments />
      <PartsPriceList />
    </div>

    <div class="modal-bottom self-end justify-self-end flex items-center justify-end pt-4 px-4 pb-0 w-full border-t-2 border-t-neutral-content">
      <div class="flex">
        <div class="flex flex-col items-center justify-center">
          <span class="text-sm">Click this if you're having issues &rarr;</span>
          <span class="text-sm text-warning">Warning: This will reset everything!</span>
        </div>
        <button type="button" class="btn btn-primary ml-2" on:click={clearStorage}>Clear App Storage</button>
      </div>
    </div>
  </form>
  <form method="dialog" class="modal-backdrop">
    <button type="button" onClick="settings_modal.close()">close</button>
  </form>
</dialog>