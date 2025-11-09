<!-- src/routes/projects/+page.svelte -->
<script lang="ts">
	let { data } = $props();
	const { projects, error } = data;
</script>

<div class="container mx-auto px-6 py-20">
	<h1 class="mb-12 text-center text-4xl font-bold">Mes Projets</h1>

	{#if error}
		<p class="text-center text-red-500">{error}</p>
	{:else if projects.length === 0}
		<p class="text-center text-gray-500">Aucun projet disponible</p>
	{:else}
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each projects as project}
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
							<span
								class="absolute top-2 right-2 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold"
							>
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

						<!-- Liens -->
						<div class="flex gap-3 text-sm">
							{#if project.demo_url}
								<span class="text-indigo-600 hover:text-indigo-700"> 🔗 Demo </span>
							{/if}
							{#if project.github_url}
								<span class="text-gray-700 hover:text-gray-900"> 💻 Code </span>
							{/if}
						</div>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
