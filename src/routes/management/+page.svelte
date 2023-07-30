<script lang="ts">
import Management from '$lib/components/Settings/Management.svelte';
import { ArrowLeft, Icon } from 'svelte-hero-icons';
import { theme } from '$lib/stores/theme';
</script>

<svelte:head>
  <title>Management | {$theme.name}</title>
</svelte:head>

<section class="flex flex-col min-w-full min-h-screen rounded-lg bg-primary/70 text-primary-content p-8">
  <div class="flex flex-nowrap items-center justify-between w-full px-5 mb-8">
    <a href="/" class="flex items-center drop-shadow-2xl text-primary-content hover:text-accent hover:no-underline">
      <Icon src={ArrowLeft} size="32" />
      <span class="ml-4">Back</span>
    </a>
    <h1 class="text-2xl flex-grow">Management Settings</h1>
  </div>

  <Management />
</section>