<!-- src/lib/components/ui/Navbar.svelte -->
<script lang="ts">
	let scrolled = $state(false);
	let mobileMenuOpen = $state(false);

	const sections = [
		{ id: 'hero', label: 'Accueil' },
		{ id: 'about', label: 'À propos' },
		{ id: 'skills', label: 'Compétences' },
		{ id: 'projects', label: 'Projets' },
		{ id: 'contact', label: 'Contact' }
	];

	function scrollToSection(id: string) {
		const element = document.getElementById(id);
		element?.scrollIntoView({ behavior: 'smooth' });
		mobileMenuOpen = false; // Fermer le menu après navigation
	}

	// Détecter le scroll
	$effect(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 50;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<nav
	class="fixed top-0 z-50 w-full transition-all duration-300"
	class:bg-white={scrolled}
	class:shadow-md={scrolled}
	class:bg-transparent={!scrolled}
>
	<div class="container mx-auto px-6 py-4">
		<div class="flex items-center justify-between">
			<!-- Logo -->
			<button onclick={() => scrollToSection('hero')} class="text-2xl font-bold text-gray-900">
				Portfolio
			</button>

			<!-- Navigation Desktop -->
			<ul class="hidden gap-8 md:flex">
				{#each sections as section}
					<li>
						<button
							onclick={() => scrollToSection(section.id)}
							class="text-gray-700 transition-colors hover:text-indigo-600"
						>
							{section.label}
						</button>
					</li>
				{/each}
			</ul>

			<!-- CTA Desktop -->
			<a
				href="#contact"
				class="hidden rounded-full bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700 md:block"
			>
				Me contacter
			</a>

			<!-- Burger Button -->
			<button
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				class="text-gray-700 focus:outline-none md:hidden"
				aria-label="Menu"
			>
				{#if !mobileMenuOpen}
					<!-- Icon hamburger -->
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				{:else}
					<!-- Icon close -->
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				{/if}
			</button>
		</div>

		<!-- Menu Mobile -->
		{#if mobileMenuOpen}
			<div class="animate-slideDown mt-4 pb-4 md:hidden">
				<ul class="flex flex-col gap-4">
					{#each sections as section}
						<li>
							<button
								onclick={() => scrollToSection(section.id)}
								class="block w-full py-2 text-left text-gray-700 transition-colors hover:text-indigo-600"
							>
								{section.label}
							</button>
						</li>
					{/each}
					<li class="pt-2">
						<button
							onclick={() => scrollToSection('contact')}
							class="w-full rounded-full bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
						>
							Me contacter
						</button>
					</li>
				</ul>
			</div>
		{/if}
	</div>
</nav>

<style>
	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-slideDown {
		animation: slideDown 0.2s ease-out;
	}
</style>
