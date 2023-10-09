<script lang="ts">
	import Header from './Header.svelte';
	import './styles.css';
	import { onMount } from 'svelte';
	import { THEMES } from '$lib/consts/themes';
	import { theme } from '$lib/stores/theme';
	import Footer from './Footer.svelte';
	import Changelog from '$lib/components/Changelog/Changelog.svelte';

		onMount(async () => {
		// Clear App Storage for transition to v1.2.1
		localStorage.clear();

		// Grab the theme from the URL
		const urlParams = new URLSearchParams(window.location.search);

		if (urlParams.has('theme')) {
			const urlTheme = urlParams.get('theme');

			if (THEMES[urlTheme]) {
				$theme = THEMES[urlTheme];
			}
		}
	});
</script>

<div class="flex flex-col min-h-screen bg-secondary text-secondary-content" data-theme={$theme.daisyUITheme}>
	<Header />

	<main class="flex items-center justify-center flex-grow p-4 w-full max-w-5xl mx-auto">
		<slot />
	</main>

	<Footer />
</div>

<!-- Modals -->
<Changelog />