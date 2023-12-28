<script lang="ts">
  import Management from '$lib/components/Settings/Management.svelte';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { ArrowLeft } from '@steeze-ui/heroicons';
  import { appSettings } from '$lib/stores/appSettings';
</script>

<svelte:head>
  <title>Management | {$appSettings.store.name}</title>
</svelte:head>

<section class="flex flex-col min-w-full min-h-screen rounded-lg bg-primary/70 text-primary-content p-8">
  <div class="flex flex-nowrap items-center justify-between w-full px-5 mb-4">
    <a
      href="/"
      class="flex items-center p-2 px-0 text-primary-content rounded-xl border border-transparent hover:no-underline hover:font-bold hover:border-primary-content hover:px-2 transition-all"
      title="Return to App"
    >
      <Icon src={ArrowLeft} size="32" />
      <span class="ml-4">Back</span>
    </a>
    <h1 class="text-3xl flex-grow">Management Settings</h1>
  </div>

  <Management />
</section>
