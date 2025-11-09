<!-- src/lib/components/sections/Projects.svelte -->
<script lang="ts">
	import ProjectCard from '$lib/components/ui/ProjectCard.svelte';
	import { onMount } from 'svelte';

	let projects = $state([]);
	let loading = $state(true);
	let selectedTag = $state('all');

	onMount(async () => {
		const res = await fetch('/api/projects');
		projects = await res.json();
		loading = false;
	});

	const filteredProjects = $derived(
		selectedTag === 'all' ? projects : projects.filter((p) => p.tags?.includes(selectedTag))
	);

	const allTags = $derived(['all', ...new Set(projects.flatMap((p) => p.tags || []))]);
</script>

<section id="projects" class="px-6 py-20">
	<div class="container mx-auto max-w-6xl">
		<h2 class="mb-4 text-center text-4xl font-bold text-gray-900">Mes Projets</h2>
		<p class="mb-12 text-center text-gray-600">Découvrez mes réalisations récentes</p>

		<!-- Filtres -->
		<div class="mb-8 flex flex-wrap justify-center gap-2">
			{#each allTags as tag}
				<button
					onclick={() => (selectedTag = tag)}
					class="rounded-full px-4 py-2 transition-all"
					class:bg-indigo-600={selectedTag === tag}
					class:text-white={selectedTag === tag}
					class:bg-gray-200={selectedTag !== tag}
					class:text-gray-700={selectedTag !== tag}
				>
					{tag.charAt(0).toUpperCase() + tag.slice(1)}
				</button>
			{/each}
		</div>

		<!-- Grille de projets -->
		{#if loading}
			<p class="text-center text-gray-500">Chargement...</p>
		{:else}
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each filteredProjects as project}
					<ProjectCard {project} />
				{/each}
			</div>
		{/if}
	</div>
</section>
