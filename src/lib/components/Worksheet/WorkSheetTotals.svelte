<script lang="ts">
  import { priceFormatter } from '$lib/utils/priceFormatter';
  import { items } from '$lib/stores/items';
  import { appSettings } from '$lib/stores/appSettings';
  import {
    DocumentDuplicate,
    Icon,
  } from 'svelte-hero-icons';

  export let magicNumber = '';
  export let label = '';

  const applyDiscount = (event: Event) => {
    $appSettings.discount = Math.max(Math.min(Number(event.target?.value), 100), 0);
  };

  const copyToClipboard = async (event: Event) => {
    await navigator.clipboard.writeText(billingCommand);

    const tooltip = event.target?.closest('.tooltip-success');
    tooltip.classList.add('tooltip', 'tooltip-open');
    setTimeout(() => tooltip.classList.remove('tooltip', 'tooltip-open'), 2000);
  };

  $: baseTotal = $items.reduce((acc, item) => acc + item.part.cost * item.quantity, 0);

  $: categoryTotals = $appSettings.categories.map(category => (
    $items.filter(item => item.part.category === category.id)
      .reduce((acc, item) => acc + item.part.cost * item.quantity, 0)
  ));
  $: categoryMarkups = $appSettings.categories.map(category => {
    const markup = $appSettings.markup[category.id] ?? 0;
    const total = categoryTotals[$appSettings.categories.indexOf(category)];

    return total * (markup / 100);
  });

  $: subTotal = categoryMarkups.reduce((acc, markup, index) => acc + markup + categoryTotals[index], 0);

  $: discount = (subTotal * $appSettings.discount / 100);
  $: totalCost = Math.max(subTotal - discount, 0);

  $: billingCommand = '/billing '
                      + `${magicNumber && magicNumber.trim() !== '' ? magicNumber : '[special number]'} `
                      + `${totalCost} ${label && label.trim() !== '' ? label : 'DDM'}`;
</script>

<div class="divider"></div>
<div class="grid grid-cols-3 w-full text-right text-lg mb-2">
  <span class="col-span-2">Base Total</span>
  <span class="text-right">{priceFormatter.format(baseTotal)}</span>
</div>

{#each categoryMarkups as markup, index}
  <div class="grid grid-cols-3 w-full text-right">
    <span class="col-span-2 capitalize">{$appSettings.categories[index].name} Markup ({$appSettings.markup[$appSettings.categories[index].id]}&percnt;)</span>
    <span>{priceFormatter.format(markup)}</span>
  </div>
{/each}

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
        on:input={applyDiscount}
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

<div class="grid-cols-3 w-full mt-4 form-control">
  <div>
    <span class="label-text">Billing</span>
  </div>
  <div class="join">
    <span class="flex items-center input input-bordered join-item w-full">{billingCommand}</span>
    <div class="tooltip-success" data-tip="Copied to clipboard!">
      <button type="button" class="btn btn-accent btn-outline join-item" on:click={copyToClipboard}>
        <Icon src={DocumentDuplicate} size="28" />
      </button>
    </div>
  </div>
</div>