<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import ChatWidget from '$lib/components/chat/ChatWidget.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col bg-gray-50">
	<Navbar />

	<main class="flex-1">
		{@render children()}
	</main>

	<Footer />

	<ChatWidget />
</div>
