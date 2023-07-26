<script lang="ts">
	import { fly } from 'svelte/transition';
	import PartsCatalog from '$lib/components/PartsCatalog/PartsCatalog.svelte';
	import Worksheet from '$lib/components/Worksheet/Worksheet.svelte';
	import { theme } from '$lib/stores/theme';
	import { Cog8Tooth, Icon } from 'svelte-hero-icons';
</script>

<svelte:head>
	<title>{$theme.name}</title>
	<meta name="description" content="An application for GTA V RP for managing mechanic work and invoicing" />
</svelte:head>

<div class="relative">
	<section class="rounded-lg p-8 bg-secondary/70 shadow-xl flex flex-col min-h-[90vh] transition duration-150 ease-in-out">
		<div class="flex items-center justify-between mb-4">
			<h1 class="text-3xl text-bold">Welcome to {$theme.name}!</h1>
			<button
				title="Settings"
				class="flex items-center gap-0 p-1 pl-2 group rounded cursor-pointer drop-shadow-2xl hover:text-accent"
				onClick="settings_modal.showModal()"
			>
        <span class="w-0 mr-0 group-hover:w-16 group-hover:mr-1 overflow-hidden transition-all duration-150 ease-in-out">
          Settings&nbsp;
        </span>
				<Icon src={Cog8Tooth} size="32" />
			</button>
		</div>

		<div class="flex justify-between relative z-10 gap-12 mt-8 max-sm:flex-col" in:fly={{ y: 20 }} out:fly={{ y: -20 }}>
			<PartsCatalog />
			<Worksheet />
		</div>
	</section>
	{#if $theme.image}
		<picture>
			<img src={$theme.image} class="absolute bottom-0 right-0 pointer-events-none z-0" alt={$theme.name} />
		</picture>
	{/if}
</div>

<style>
</style>
