<script>
  import { appSettings } from '$lib/stores/appSettings';
  import { saveSettings } from '$lib/appSettings/settingsHelpers';
  import { PART_CATEGORIES } from '$lib/types/PartCategories';
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
          class="input input-bordered rounded-lg w-24 text-center"
          value={$appSettings.markup[category]}
          on:keyup={async (event) => {
            $appSettings.markup[category] = Number(event.target?.value);
            await saveSettings();
          }}
        />
      </div>
    {/each}
  </section>
</div>