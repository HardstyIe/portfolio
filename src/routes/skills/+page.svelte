<!-- src/routes/skills/+page.svelte -->
<script lang="ts">
	const skills = {
		frontend: ['React', 'Svelte', 'TypeScript', 'Tailwind'],
		backend: ['Node.js', 'Python', 'PostgreSQL', 'API REST'],
		tools: ['Git', 'Docker', 'VS Code', 'Figma']
	};
</script>

<div class="container mx-auto px-4 py-16">
	<h1 class="mb-12 text-4xl font-bold">Compétences</h1>

	<div class="grid gap-8 md:grid-cols-3">
		{#each Object.entries(skills) as [category, items]}
			<div class="rounded-lg border p-6">
				<h3 class="mb-4 text-xl font-semibold capitalize">{category}</h3>
				<ul class="space-y-2">
					{#each items as skill}
						<li class="flex items-center gap-2">
							<span class="h-2 w-2 rounded-full bg-indigo-600"></span>
							{skill}
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</div>
