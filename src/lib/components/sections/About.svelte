<!-- src/lib/components/sections/About.svelte -->
<section id="about" class="px-6 py-20">
	<div class="container mx-auto max-w-4xl">
		<h2 class="mb-12 text-center text-4xl font-bold text-gray-900">À propos de moi</h2>

		<div class="grid gap-12 md:grid-cols-2">
			<!-- Photo -->
			<div class="flex justify-center">
				<img
					src="/profile.jpg"
					alt="Profile"
					class="h-64 w-64 rounded-full object-cover shadow-xl"
				/>
			</div>

			<!-- Description -->
			<div class="flex flex-col justify-center">
				<p class="mb-6 text-lg text-gray-700">
					Passionné par le développement web depuis mes débuts en 2020, je me spécialise dans la
					création d'applications performantes et élégantes.
				</p>
				<p class="mb-6 text-lg text-gray-700">
					Formé en développement Full Stack, j'ai acquis une expertise solide en
					JavaScript/TypeScript, React, Svelte et Node.js.
				</p>
				<p class="text-lg text-gray-700">
					Actuellement en recherche de nouvelles opportunités pour mettre mes compétences au service
					de projets innovants.
				</p>

				<!-- Liens sociaux -->
				<div class="mt-8 flex gap-4">
					<a
						href="https://github.com/..."
						class="rounded-full bg-gray-900 p-3 text-white hover:bg-gray-700"
						aria-label="GitHub"
					>
						<!-- Icon GitHub -->
					</a>
					<a
						href="https://linkedin.com/..."
						class="rounded-full bg-blue-600 p-3 text-white hover:bg-blue-700"
						aria-label="LinkedIn"
					>
						<!-- Icon LinkedIn -->
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
