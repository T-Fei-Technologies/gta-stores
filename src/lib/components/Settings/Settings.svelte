<script lang="ts">
  import { clearStorage } from '$lib/appSettings/settingsHelpers';
</script>

<dialog id="settings_modal" class="modal">
  <form method="dialog" class="modal-box flex flex-col rounded-lg overflow-hidden px-0 pb-4 max-w-5xl max-sm:max-w-full max-h-full text-primary-content">
    <div class="flex flex-nowrap items-center justify-between w-full px-5">
      <h1 class="text-3xl flex-grow">Settings</h1>
      <button type="button" class="btn btn-sm btn-circle btn-ghost" onClick="settings_modal.close()">✕</button>
    </div>

    <div class="h-4/5 px-6 my-4 self-stretch flex-grow overflow-y-auto overscroll-contain">
      <p class="prose">
        Prices and other settings are handled by management now and loaded whenever you refresh the site.<br />
        <br />
        If the site is down, it'll use the last settings you received.
      </p>
    </div>

    <div class="modal-bottom self-end justify-self-end flex items-center justify-end pt-4 px-4 pb-0 w-full border-t-2 border-t-neutral-content">
      <div class="flex">
        <div class="flex flex-col items-center justify-center">
          <span class="text-sm">Click this if you're having issues &rarr;</span>
          <span class="text-sm text-warning">Warning: This will reset everything!</span>
        </div>
        <button type="button" class="btn btn-primary rounded-lg ml-2 drop-shadow-2xl" on:click={clearStorage}>
          Clear App Storage
        </button>
      </div>
    </div>
  </form>
  <form method="dialog" class="modal-backdrop">
    <button type="button" onClick="settings_modal.close()">close</button>
  </form>
</dialog>