<!-- src/lib/components/sections/Contact.svelte -->
<script lang="ts">
	import { textToHexEntities } from '$lib/utils/encodeMail';
	import { Github, Linkedin, Mail, MapPin } from 'lucide-svelte';

	let formData = $state({
		name: '',
		email: '',
		message: ''
	});

	let status = $state('');

	async function handleSubmit(e: Event) {
		e.preventDefault();
		status = 'sending';

		// Ton API d'envoi d'email ici
		// Exemple avec EmailJS ou ton backend

		status = 'success';
		formData = { name: '', email: '', message: '' };
	}
</script>

<section id="contact" class="bg-linear-to-br from-indigo-600 to-purple-600 px-6 py-20 text-white">
	<div class="container mx-auto max-w-4xl">
		<h2 class="mb-4 text-center text-4xl font-bold">Discutons de votre projet</h2>
		<p class="mb-12 text-center text-lg text-indigo-100">
			Développeur web junior passionné et motivé, je recherche activement des opportunités<br />
			pour mettre mes compétences au service de projets innovants.
		</p>

		<div class="grid gap-12 md:grid-cols-2">
			<!-- Formulaire -->
			<form onsubmit={handleSubmit} class="space-y-4">
				<div>
					<label for="name" class="mb-2 block font-medium">Nom</label>
					<input
						type="text"
						id="name"
						bind:value={formData.name}
						required
						class="w-full rounded-lg bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm focus:ring-2 focus:ring-white/50 focus:outline-none"
						placeholder="Votre nom"
					/>
				</div>

				<div>
					<label for="email" class="mb-2 block font-medium">Email</label>
					<input
						type="email"
						id="email"
						bind:value={formData.email}
						required
						class="w-full rounded-lg bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm focus:ring-2 focus:ring-white/50 focus:outline-none"
						placeholder="votre@email.com"
					/>
				</div>

				<div>
					<label for="message" class="mb-2 block font-medium">Message</label>
					<textarea
						id="message"
						bind:value={formData.message}
						required
						rows="4"
						class="w-full rounded-lg bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm focus:ring-2 focus:ring-white/50 focus:outline-none"
						placeholder="Parlez-moi de votre projet ou de votre opportunité..."
					></textarea>
				</div>

				<button
					type="submit"
					disabled={status === 'sending'}
					class="w-full rounded-lg bg-white px-6 py-3 font-bold text-indigo-600 transition-all hover:bg-gray-100 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
				>
					{status === 'sending' ? 'Envoi en cours...' : 'Envoyer le message'}
				</button>

				{#if status === 'success'}
					<p class="text-center font-medium text-green-300">
						✓ Message envoyé avec succès ! Je vous répondrai rapidement.
					</p>
				{/if}
			</form>

			<!-- Infos de contact -->
			<div class="space-y-6">
				<div>
					<h3 class="mb-4 text-2xl font-bold">Restons en contact</h3>
					<p class="mb-6 text-indigo-100">
						Ouvert à toute opportunité professionnelle dans le développement web. N'hésitez pas à me
						contacter pour échanger !
					</p>
				</div>

				<div class="flex items-center gap-4">
					<Mail size={24} />
					<div>
						<p class="font-medium">Email</p>
						<a
							href={textToHexEntities('mailto:duchemindylan59@gmail.com')}
							class="text-indigo-200 transition-colors hover:text-white"
						>
							{@html textToHexEntities('duchemindylan59@gmail.com')}
						</a>
					</div>
				</div>

				<div class="flex items-center gap-4">
					<MapPin size={24} />
					<div>
						<p class="font-medium">Localisation</p>
						<p class="text-indigo-200">Lille, Hauts-de-France</p>
					</div>
				</div>

				<div class="flex items-center gap-4">
					<Github size={24} />
					<div>
						<p class="font-medium">GitHub</p>
						<a
							href="https://github.com/HardstyIe"
							target="_blank"
							rel="noopener noreferrer"
							class="text-indigo-200 transition-colors hover:text-white"
						>
							@HardstyIe
						</a>
					</div>
				</div>

				<div class="flex items-center gap-4">
					<Linkedin size={24} />
					<div>
						<p class="font-medium">LinkedIn</p>
						<a
							href="https://linkedin.com/in/dylan-duchemin"
							target="_blank"
							rel="noopener noreferrer"
							class="text-indigo-200 transition-colors hover:text-white"
						>
							Dylan Duchemin
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
