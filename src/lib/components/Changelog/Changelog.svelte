<script>
  import { changelog } from '$lib/consts/changelog';
  import WhatsNewListItem from '$lib/components/Changelog/WhatsNewListItem.svelte';
</script>


<dialog id="changelog_modal" class="modal">
  <form method="dialog" class="modal-box rounded-lg overflow-hidden px-0 max-w-3xl max-sm:max-w-full h-4/5 max-h-[90vh] text-neutral-content">
    <div class="flex flex-nowrap items-center justify-between px-5">
      <h1 class="text-3xl flex-grow">What's New</h1>
      <button for="changelog_modal" class="btn btn-sm btn-circle btn-ghost">✕</button>
    </div>

    <div class="h-[95%] px-6 my-4 overflow-y-auto overscroll-contain">
      {#each changelog as whatsNewItem}
        <WhatsNewListItem whatsNew={whatsNewItem} />
      {/each}
    </div>
  </form>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
