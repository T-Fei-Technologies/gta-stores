<script>
  import { appSettings } from '$lib/stores/appSettings.ts';
  import { saveSettings } from '$lib/appSettings/settingsHelpers.ts';
  import { PART_CATEGORIES } from '$lib/types/PartCategories.ts';
</script>

<div class="mb-4">
  <h3 class="mb-2 text-xl">Markups</h3>

  <section class="flex justify-between p-4 rounded-lg bg-neutral text-neutral-content">
    {#each Object.values(PART_CATEGORIES) as category}
      <div class="form-control relative">
        <label class="label" for={`${category}-markup`}>
          <span class="label-text capitalize">{category} % Markup</span>
        </label>
        <input
          type="number"
          id={`${category}-markup`}
          class="input input-bordered w-24 text-center"
          value={$appSettings.markup[category]}
          on:keyup={(event) => {
            $appSettings.markup.cosmetics = event.target.value;
            saveSettings();
          }}
        />
      </div>
    {/each}
  </section>
</div>