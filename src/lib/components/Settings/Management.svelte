<script lang="ts">
  import MarkupAdjustments from '$lib/components/Settings/MarkupAdjustments.svelte';
  import PartsPriceList from '$lib/components/Settings/PartsPriceList.svelte';
</script>

<div class="flex flex-col overflow-hidden px-0 pb-4 max-w-5xl max-sm:max-w-full max-h-full">
  <div class="h-4/5 px-6 my-4 self-stretch flex-grow overflow-y-auto overscroll-contain">
    <MarkupAdjustments />
    <PartsPriceList />
  </div>

  <div class="self-end justify-self-end flex items-center justify-end pt-4 px-4 pb-0 w-full border-t-2 border-t-neutral-content">
    <div class="flex">
      <div class="flex flex-col items-center justify-center">
        <span class="text-sm">Click this if you're having issues &rarr;</span>
        <span class="text-sm text-warning">Warning: This will reset everything!</span>
      </div>
<!--      <button-->
<!--        type="button"-->
<!--        class="btn btn-accent text-accent-content rounded-lg ml-2 drop-shadow-2xl"-->
<!--        on:click={async () => await clearStorage(true)}-->
<!--      >-->
<!--        Clear App Storage-->
<!--      </button>-->
    </div>
  </div>
</div>