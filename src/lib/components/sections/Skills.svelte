<!-- src/lib/components/sections/Skills.svelte -->
<script lang="ts">
	const skills = {
		frontend: ['HTML5/CSS3', 'JavaScript', 'TypeScript', 'React', 'Svelte', 'Tailwind CSS'],
		backend: ['Node.js', 'Express', 'NestJS', 'PostgreSQL', 'API REST'],
		tools: ['Git/GitHub', 'Docker', 'n8n', 'Figma', 'VS Code'],
		mobile: ['Flutter', 'Dart']
	};
</script>

<section id="skills" class="bg-gray-100 px-6 py-20">
	<div class="container mx-auto max-w-6xl">
		<h2 class="mb-12 text-center text-4xl font-bold text-gray-900">Compétences Techniques</h2>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
			<!-- Frontend -->
			<div class="rounded-xl bg-white p-6 shadow-lg">
				<h3 class="mb-4 text-xl font-bold text-indigo-600">Frontend</h3>
				<div class="flex flex-wrap gap-2">
					{#each skills.frontend as skill}
						<span class="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700">
							{skill}
						</span>
					{/each}
				</div>
			</div>

			<!-- Backend -->
			<div class="rounded-xl bg-white p-6 shadow-lg">
				<h3 class="mb-4 text-xl font-bold text-green-600">Backend</h3>
				<div class="flex flex-wrap gap-2">
					{#each skills.backend as skill}
						<span class="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
							{skill}
						</span>
					{/each}
				</div>
			</div>

			<!-- Tools -->
			<div class="rounded-xl bg-white p-6 shadow-lg">
				<h3 class="mb-4 text-xl font-bold text-purple-600">Outils</h3>
				<div class="flex flex-wrap gap-2">
					{#each skills.tools as skill}
						<span class="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
							{skill}
						</span>
					{/each}
				</div>
			</div>

			<!-- Mobile -->
			<div class="rounded-xl bg-white p-6 shadow-lg">
				<h3 class="mb-4 text-xl font-bold text-orange-600">Mobile</h3>
				<div class="flex flex-wrap gap-2">
					{#each skills.mobile as skill}
						<span class="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700">
							{skill}
						</span>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
