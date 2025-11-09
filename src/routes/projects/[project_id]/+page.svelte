<!-- src/routes/projects/[id]/+page.svelte -->
<script lang="ts">
	let { data } = $props();
	const { project } = data;
</script>

<div class="container mx-auto px-6 py-20">
	<!-- Breadcrumb -->
	<nav class="mb-8 text-sm">
		<a href="/" class="text-gray-500 hover:text-gray-700">Accueil</a>
		<span class="mx-2 text-gray-400">/</span>
		<a href="/projects" class="text-gray-500 hover:text-gray-700">Projets</a>
		<span class="mx-2 text-gray-400">/</span>
		<span class="text-gray-900">{project.name}</span>
	</nav>

	<!-- Header -->
	<div class="mb-12">
		<h1 class="mb-4 text-5xl font-bold text-gray-900">{project.name}</h1>
		<p class="text-xl text-gray-600">{project.short_description}</p>
	</div>

	<!-- Image principale -->
	{#if project.image_url}
		<div class="mb-12 overflow-hidden rounded-2xl shadow-2xl">
			<img src={project.image_url} alt={project.name} class="w-full" />
		</div>
	{/if}

	<!-- Liens et actions -->
	<div class="mb-12 flex gap-4">
		{#if project.demo_url}
			<a
				href={project.demo_url}
				target="_blank"
				class="flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
			>
				🔗 Voir la démo
			</a>
		{/if}
		{#if project.github_url}
			<a
				href={project.github_url}
				target="_blank"
				class="flex items-center gap-2 rounded-full border-2 border-gray-300 px-6 py-3 hover:bg-gray-50"
			>
				💻 Voir le code
			</a>
		{/if}
	</div>

	<div class="grid gap-12 lg:grid-cols-3">
		<!-- Contenu principal -->
		<div class="lg:col-span-2">
			<!-- Description complète -->
			<section class="mb-12">
				<h2 class="mb-4 text-3xl font-bold">Description</h2>
				<p class="text-lg leading-relaxed text-gray-700">{project.full_description}</p>
			</section>

			<!-- Fonctionnalités -->
			<section class="mb-12">
				<h2 class="mb-4 text-3xl font-bold">Fonctionnalités</h2>
				<ul class="space-y-2">
					{#each project.features as feature}
						<li class="flex items-start gap-2">
							<span class="text-indigo-600">✓</span>
							<span class="text-gray-700">{feature}</span>
						</li>
					{/each}
				</ul>
			</section>

			<!-- Points forts -->
			<section>
				<h2 class="mb-4 text-3xl font-bold">Points forts</h2>
				<ul class="space-y-2">
					{#each project.highlights as highlight}
						<li class="flex items-start gap-2">
							<span class="text-yellow-500">⭐</span>
							<span class="text-gray-700">{highlight}</span>
						</li>
					{/each}
				</ul>
			</section>
		</div>

		<!-- Sidebar -->
		<div class="lg:col-span-1">
			<!-- Stack technique -->
			<div class="mb-8 rounded-xl bg-gray-50 p-6">
				<h3 class="mb-4 text-xl font-bold">Stack Technique</h3>
				<div class="flex flex-wrap gap-2">
					{#each project.tech_stack as tech}
						<span class="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700">
							{tech}
						</span>
					{/each}
				</div>
			</div>

			<!-- Technologies par catégorie -->
			<div class="mb-8 rounded-xl bg-gray-50 p-6">
				<h3 class="mb-4 text-xl font-bold">Technologies</h3>
				{#each Object.entries(project.technologies) as [category, techs]}
					<div class="mb-4">
						<h4 class="mb-2 font-semibold text-gray-700 capitalize">{category}</h4>
						<ul class="space-y-1">
							<!-- {#each techs as tech}
                <li class="text-gray-600">• {tech}</li>
              {/each} -->
						</ul>
					</div>
				{/each}
			</div>

			<!-- Infos projet -->
			<div class="rounded-xl bg-gray-50 p-6">
				<h3 class="mb-4 text-xl font-bold">Informations</h3>
				<dl class="space-y-3">
					<div>
						<dt class="text-sm font-medium text-gray-500">Statut</dt>
						<dd class="text-gray-900">{project.status}</dd>
					</div>
					<div>
						<dt class="text-sm font-medium text-gray-500">Catégorie</dt>
						<dd class="text-gray-900">{project.category}</dd>
					</div>
					<div>
						<dt class="text-sm font-medium text-gray-500">Langage</dt>
						<dd class="text-gray-900">{project.language}</dd>
					</div>
				</dl>
			</div>
		</div>
	</div>

	<!-- Retour à la liste -->
	<div class="mt-12 text-center">
		<a href="/projects" class="inline-block text-indigo-600 hover:text-indigo-700">
			← Retour aux projets
		</a>
	</div>
</div>
