<!-- src/lib/components/ui/ProjectCard.svelte -->
<script lang="ts">
	let { project } = $props();
</script>

<a
	href="/projects/{project.project_id}"
	class="group overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl"
>
	<!-- Image -->
	<div class="relative h-48 overflow-hidden bg-gray-200">
		{#if project.image_url}
			<img
				src={project.image_url}
				alt={project.name}
				class="h-full w-full object-cover transition-transform group-hover:scale-110"
			/>
		{:else}
			<div class="flex h-full items-center justify-center text-gray-400">Pas d'image</div>
		{/if}
		{#if project.is_featured}
			<span class="absolute top-2 right-2 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold">
				⭐ Featured
			</span>
		{/if}
	</div>

	<!-- Contenu -->
	<div class="p-6">
		<h3 class="mb-2 text-xl font-bold text-gray-900">{project.name}</h3>
		<p class="mb-4 text-gray-600">{project.short_description}</p>

		<!-- Tags -->
		<div class="mb-4 flex flex-wrap gap-2">
			{#each project.tags.slice(0, 3) as tag}
				<span class="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
					{tag}
				</span>
			{/each}
		</div>

		<!-- Liens/Indication -->
		<div class="mt-3 flex gap-3 text-sm text-gray-500">
			<span>👆 Cliquez pour plus de détails</span>
		</div>
	</div>
</a>
