<script lang="ts">
	import { fly } from 'svelte/transition';
	import PartsCatalog from '$lib/components/PartsCatalog/PartsCatalog.svelte';
	import Worksheet from '$lib/components/Worksheet/Worksheet.svelte';
	import { theme } from '$lib/stores/theme';
	import { Cog8Tooth, ShoppingCart, Icon } from 'svelte-hero-icons';
	import { getItemCount } from '$lib/utils/getItemCount';
	import { items } from '$lib/stores/items';

	$: itemCount = getItemCount($items);

	let closeDrawer = () => {
		document.getElementById('mobile-drawer').checked = false;
	};
</script>

<svelte:head>
	<title>{$theme.name}</title>
	<meta name="description" content="An application for GTA V RP for managing mechanic work and invoicing" />
</svelte:head>

<div class="relative">
	<section class="rounded-lg pb-8 md:p-8 box-border bg-primary/70 text-primary-content shadow-xl flex flex-col min-h-[90vh] transition duration-150 ease-in-out">
		<div class="flex items-center justify-between mb-4 p-4 md:p-0">
			<h1 class="text-lg md:text-3xl text-bold">Welcome to {$theme.name}!</h1>
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

		<div
			class="flex justify-center md:justify-between relative z-10 md:gap-12 md:mt-8 max-sm:flex-col max-sm:drawer drawer-end max-sm:overscroll-contain"
			in:fly={{ y: 20 }}
			out:fly={{ y: -20 }}
		>
			<input id="mobile-drawer" type="checkbox" class="drawer-toggle" />
			<div class="max-sm:drawer-content">
				<PartsCatalog />
			</div>
			<div class="max-sm:drawer-side max-sm:z-20 overscroll-contain">
				<label for="mobile-drawer" class="drawer-overlay"></label>
				<Worksheet closeDrawer={closeDrawer} />
			</div>

			{#if itemCount > 0}
				<div class="indicator sm:hidden fixed bottom-16 right-6 z-10" in:fly={{ x: 20 }} out:fly={{ x: -20 }}>
					<span class="indicator-item badge badge-secondary">{itemCount}</span>
					<label for="mobile-drawer" class="btn btn-primary">
						<Icon src={ShoppingCart} size="32" />
					</label>
				</div>
			{/if}
		</div>
	</section>

	<picture class="absolute top-32 left-1/2 -translate-x-1/2 pointer-events-none z-0">
		<img src='/ddm-logo.png' class="w-full" alt={$theme.name} />
	</picture>
</div>

<style>
</style>
