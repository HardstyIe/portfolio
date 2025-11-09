<!-- src/lib/components/ui/ProjectCard.svelte -->
<script lang="ts">
	import { ExternalLink, Github } from 'lucide-svelte';

	let { project } = $props();
</script>

<div
	class="group overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl"
>
	<!-- Image -->
	<div class="relative h-48 overflow-hidden">
		<img
			src={project.image_url || '/placeholder.jpg'}
			alt={project.title}
			class="h-full w-full object-cover transition-transform group-hover:scale-110"
		/>
		{#if project.is_featured}
			<span class="absolute top-2 right-2 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold">
				⭐ Featured
			</span>
		{/if}
	</div>

	<!-- Contenu -->
	<div class="p-6">
		<h3 class="mb-2 text-xl font-bold text-gray-900">{project.title}</h3>
		<p class="mb-4 text-gray-600">{project.short_description}</p>

		<!-- Tags -->
		<div class="mb-4 flex flex-wrap gap-2">
			{#each project.technologies as tech}
				<span class="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
					{tech}
				</span>
			{/each}
		</div>

		<!-- Liens -->
		<div class="flex gap-3">
			{#if project.live_url}
				<a
					href={project.live_url}
					target="_blank"
					class="flex items-center gap-1 text-indigo-600 hover:text-indigo-700"
				>
					<ExternalLink size={16} />
					<span>Demo</span>
				</a>
			{/if}
			{#if project.github_url}
				<a
					href={project.github_url}
					target="_blank"
					class="flex items-center gap-1 text-gray-700 hover:text-gray-900"
				>
					<Github size={16} />
					<span>Code</span>
				</a>
			{/if}
		</div>
	</div>
</div>
