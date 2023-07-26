<script lang="ts">
  import type { WhatsNew } from '$lib/types/WhatsNew';

  export let whatsNew: WhatsNew;
</script>

<section class="p-4 mt-2 mb-8 bg-neutral text-neutral-content rounded-lg">
  <h3 class="text-xl">v{whatsNew.version}{whatsNew.title ? ` - ${whatsNew.title}` : ''}</h3>
  {#if whatsNew.features}
    <div class="divider">New Features</div>
    <ul class="list-disc list-inside pt-2 pb-8">
      {#each whatsNew.features as feature}
        <li>{feature}</li>
      {/each}
    </ul>
  {/if}
  {#if whatsNew.bugfixes}
    <div class="divider">Bugfixes</div>
    <ul class="list-disc list-inside pt-2 pb-8">
      {#each whatsNew.bugfixes as bugfix}
        <li>{bugfix}</li>
      {/each}
    </ul>
  {/if}
  {#if whatsNew.other}
    <div class="divider">Other</div>
    <ul class="list-disc list-inside pt-2 pb-8">
      {#each whatsNew.other as misc}
        <li>{misc}</li>
      {/each}
    </ul>
  {/if}
</section>