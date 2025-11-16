<script>
	import { textToHexEntities } from '$lib/utils/encodeMail';
</script>

<!-- src/lib/components/ui/Footer.svelte -->
<footer class="bg-gray-900 px-6 py-8 text-white">
	<div class="container mx-auto text-center">
		<p class="mb-4">© 2025 HardstyIe - Tous droits réservés</p>
		<div class="flex justify-center gap-6">
			<a href="https://github.com/HardstyIe" class="hover:text-indigo-400">GitHub</a>
			<a href="https://www.linkedin.com/in/dylan-duchemin-528612265/" class="hover:text-indigo-400"
				>LinkedIn</a
			>
			<a href={textToHexEntities("mailto:duchemindylan59@gmail.com")} class="hover:text-indigo-400"> Email </a>
		</div>
	</div>
</footer>
