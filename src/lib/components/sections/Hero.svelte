<!-- src/lib/components/sections/Hero.svelte -->
<script lang="ts">
	import { ArrowDown } from 'lucide-svelte';
</script>

<section
	id="hero"
	class="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50 px-6"
>
	<div class="text-center">
		<!-- Titre principal -->
		<h1 class="mb-4 text-6xl font-bold text-gray-900">
			Salut, je suis <span
				class="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
			>
				Dylan Duchemin
			</span>
		</h1>

		<!-- Sous-titre animé -->
		<p class="mb-2 text-2xl text-gray-600">Développeur Full Stack</p>
		<p class="mb-8 text-xl text-gray-500">
			Je crée des expériences web modernes avec React, Svelte & Node.js
		</p>

		<!-- Stats -->
		<div class="mb-12 flex justify-center gap-12">
			<div>
				<p class="text-gray-600">Années d'expérience</p>
			</div>
			<div>
				<p class="text-3xl font-bold text-indigo-600">15+</p>
				<p class="text-gray-600">Projets réalisés</p>
			</div>
			<div>
				<p class="text-3xl font-bold text-indigo-600">10+</p>
				<p class="text-gray-600">Clients satisfaits</p>
			</div>
		</div>

		<!-- CTAs -->
		<div class="flex justify-center gap-4">
			<a
				href="#projects"
				class="flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-3 text-white transition-all hover:scale-105 hover:bg-indigo-700"
			>
				Voir mes projets
			</a>
			<a
				href="/cv.pdf"
				download
				class="rounded-full border-2 border-indigo-600 px-8 py-3 text-indigo-600 transition-all hover:bg-indigo-50"
			>
				Télécharger CV
			</a>
		</div>

		<!-- Scroll indicator -->
		<div class="mt-16">
			<a href="#about" class="inline-block animate-bounce">
				<ArrowDown size={32} class="text-gray-400" />
			</a>
		</div>
	</div>
</section>
