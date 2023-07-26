<script lang="ts">
  import { priceFormatter } from '$lib/utils/priceFormatter.ts';
  import { items } from '$lib/stores/items.ts';
  import { appSettings } from '$lib/stores/appSettings';
  import { saveSettings } from '$lib/appSettings/settingsHelpers';
  import { PART_CATEGORIES } from '$lib/types/PartCategories';
  import { getPartById } from '$lib/utils/getPartById';

  const applyDiscount = (event: Event) => {
    $appSettings.discount = Math.max(Math.min(Number(event.target.value), 100), 0);
    saveSettings();
  };

  $: getItemCost = (partId: string): number => {
    const part = getPartById($appSettings.partsCatalog, partId);
    return part?.cost || 0;
  };

  $: baseTotal = $items.reduce((acc, item) => acc + getItemCost(item.partId) * item.quantity, 0);

  $: cosmeticsTotal = $items.filter(item => item.type === PART_CATEGORIES.COSMETICS)
    .reduce((acc, item) => acc + getItemCost(item.partId) * item.quantity, 0);
  $: cosmeticsMarkup = cosmeticsTotal * ($appSettings.markup.cosmetics / 100);

  $: performanceTotal = $items.filter(item => item.type === PART_CATEGORIES.PERFORMANCE)
    .reduce((acc, item) => acc + getItemCost(item.partId) * item.quantity, 0);
  $: performanceMarkup = performanceTotal * ($appSettings.markup.performance / 100);

  $: toolsTotal = $items.filter(item => item.type === PART_CATEGORIES.TOOLS)
    .reduce((acc, item) => acc + getItemCost(item.partId) * item.quantity, 0);
  $: toolsMarkup = toolsTotal * ($appSettings.markup.tools / 100);

  $: subTotal = cosmeticsTotal + cosmeticsMarkup
                + performanceTotal + performanceMarkup
                + toolsTotal + toolsMarkup;

  $: discount = (subTotal * $appSettings.discount / 100);
  $: totalCost = Math.max(subTotal - discount, 0);
</script>

<div class="divider"></div>
<div class="grid grid-cols-3 w-full text-right text-lg mb-2">
  <span class="col-span-2">Base Total</span>
  <span class="text-right">{priceFormatter.format(baseTotal)}</span>
</div>

<div class="grid grid-cols-3 w-full text-right">
  <span class="col-span-2 capitalize">{PART_CATEGORIES.COSMETICS} Markup ({$appSettings.markup.cosmetics}&percnt;)</span>
  <span>{priceFormatter.format(cosmeticsMarkup)}</span>
</div>

<div class="grid grid-cols-3 w-full text-right">
  <span class="col-span-2 capitalize">{PART_CATEGORIES.PERFORMANCE} Markup ({$appSettings.markup.performance}&percnt;)</span>
  <span>{priceFormatter.format(performanceMarkup)}</span>
</div>

<div class="grid grid-cols-3 w-full text-right">
  <span class="col-span-2 capitalize">{PART_CATEGORIES.TOOLS} Markup ({$appSettings.markup.tools}&percnt;)</span>
  <span>{priceFormatter.format(toolsMarkup)}</span>
</div>

<div class="grid grid-cols-3 w-full text-right text-lg mt-2">
  <span class="col-span-2">Sub-Total</span>
  <span>{priceFormatter.format(subTotal)}</span>
</div>

<div class="grid grid-cols-3 w-full m-4 mb-0 mr-0 text-right">
    <div class="col-span-2">
      <span class="text-right">Discount</span>
      <input
        type="number"
        id="discount"
        class="input input-bordered rounded-lg w-20 text-right"
        value={$appSettings.discount}
        on:keyup={applyDiscount}
        on:click={applyDiscount}
      />
      <span class="pointer-events-none">%</span>
    </div>
    <span class="flex items-center justify-end text-right">{priceFormatter.format(discount)}</span>
</div>
<div class="divider"></div>
<div class="grid grid-cols-3 w-full mr-0 text-right">
  <span class="text-2xl col-span-2 text-right">Total</span>
  <span class="text-right text-2xl">{priceFormatter.format(totalCost)}</span>
</div>