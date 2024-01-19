<script lang="ts">
  import { priceFormatter } from '$lib/utils/priceFormatter';
  import { items } from '$lib/stores/items';
  import { appSettings } from '$lib/stores/appSettings';

  let isDelivery = false;
  let customAmount = 0;

  const applyDiscount = (event: Event) => {
    $appSettings.discount = Math.max(Math.min(Number(event.target?.value), 100), 0);
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

  $: customMarkupAmount = customAmount * ($appSettings.store.custom_markup / 100);
  $: customTotal = customAmount + customMarkupAmount;

  $: subTotal = categoryMarkups.reduce((acc, markup, index) => acc + markup + categoryTotals[index], 0) + customTotal;
  $: discount = (subTotal * $appSettings.discount / 100);
  $: totalCost = Math.max(subTotal + customTotal - discount + (isDelivery ? $appSettings.store.delivery_fee : 0), 0);
</script>

<div class="divider"></div>
<div class="grid grid-cols-3 w-full text-right text-lg mb-2">
  <span class="col-span-2">Base Total</span>
  <span class="text-right">{priceFormatter.format(baseTotal)}</span>
</div>

{#each categoryMarkups as markup, index}
  {#if markup > 0}
    <div class="grid grid-cols-3 w-full text-right">
      <span class="col-span-2 capitalize">
        {$appSettings.categories[index].name} {$appSettings.store.markup_name ?? 'Markup'}
        &nbsp;({$appSettings.markup[$appSettings.categories[index].id]}&percnt;)
      </span>
      <span>{priceFormatter.format(markup)}</span>
    </div>
  {/if}
{/each}

<div class="grid grid-cols-3 items-center w-full m-4 mb-0 mr-0 text-right">
  <span class="text-right col-span-2">Custom Amount $</span>
  <input
    type="number"
    id="discount"
    class="input input-bordered rounded-lg ml-4 w-32 text-right"
    bind:value={customAmount}
  />
</div>

<div class="grid grid-cols-3 w-full m-4 mb-0 mr-0 text-right">
  <span class="col-span-2 capitalize">
    Custom {$appSettings.store.markup_name ?? 'Markup'}
     ({$appSettings.store.custom_markup}%)
  </span>
  <span class="flex items-center justify-end text-right">{priceFormatter.format(customMarkupAmount)}</span>
</div>

<div class="divider"></div>

{#if categoryMarkups.some(markup => markup > 0)}
  <div class="grid grid-cols-3 w-full text-right text-lg mt-2">
    <span class="col-span-2">Sub-Total</span>
    <span>{priceFormatter.format(subTotal)}</span>
  </div>
{/if}

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

{#if $appSettings.store.has_delivery}
  <div class="grid grid-cols-3 w-full m-4 mb-0 mr-0 text-right">
    <div class="flex items-center justify-end col-span-2">
      <label for="delivery" class="flex items-center text-right">
        <input
          type="checkbox"
          id="delivery"
          class="checkbox rounded-lg mr-4"
          bind:checked={isDelivery}
        />
        Delivery
        {#if $appSettings.store.delivery_fee > 0}
          &nbsp;Fee ({priceFormatter.format($appSettings.store.delivery_fee)})
        {/if}
      </label>
    </div>
    <span class="flex items-center justify-end text-right">
      {priceFormatter.format(isDelivery ? $appSettings.store.delivery_fee : 0)}
    </span>
  </div>
{/if}

<div class="divider"></div>

<div class="grid grid-cols-3 w-full mr-0 text-right">
  <span class="text-2xl col-span-2 text-right">Total</span>
  <span class="text-right text-2xl">{priceFormatter.format(totalCost)}</span>
</div>
