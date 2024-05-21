<script lang="ts">
	import Header from './Header.svelte';
	import './styles.css';
	import { onMount } from 'svelte';
	import Footer from './Footer.svelte';
	import Changelog from '$lib/components/Changelog/Changelog.svelte';
	import { appSettings } from '$lib/stores/appSettings';


	onMount(async () => {
		// Clear App Storage for transition to v1.2.1
		localStorage.clear();
	});
</script>

<svelte:head>
	<link rel="icon" href={$appSettings.store.favicon_url} />
</svelte:head>

<div
	class="flex flex-col min-h-screen bg-secondary text-secondary-content"
	data-theme={$appSettings.store.theme ?? 'dark'}
>
	<Header />

	<main class="flex items-center justify-center flex-grow p-4 max-w-min sm:max-w-5xl mx-auto">
		<slot />
	</main>

	<Footer />
</div>

<!-- Modals -->
<Changelog />
