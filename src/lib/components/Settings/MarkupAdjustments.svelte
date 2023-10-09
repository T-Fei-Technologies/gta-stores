<script lang="ts">
  import { appSettings } from '$lib/stores/appSettings';
  import { debounceEvent } from '$lib/utils/debounceEvent';
  import { SETTINGS_DEBOUNCE_MS } from '$lib/consts/eventDebounces';

  let onInputChange = async (event: Event) => {
    // $appSettings.markup[event.target.id] = Number(event.target.value);
    // saveAppSettings();
    // await saveManagementSettings();
  }
</script>

<div class="mb-4">
  <section class="p-4 rounded-lg bg-base-100/70 text-base-content drop-shadow-2xl">
    <h3 class="mb-2 text-2xl">Markups</h3>
    <div class="flex justify-between py-4">
      {#each Object.values({}) as category}
        <div class="form-control relative">
          <label class="label" for={`${category}-markup`}>
            <span class="label-text capitalize">{category} % Markup</span>
          </label>
          <input
            type="number"
            id={`${category}`}
            class="input input-bordered rounded-lg w-24 text-center"
            value={$appSettings.markup[category]}
            on:input={debounceEvent(onInputChange, SETTINGS_DEBOUNCE_MS)}
          />
        </div>
      {/each}
    </div>
  </section>
</div>