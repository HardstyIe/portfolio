<!-- src/lib/components/sections/Contact.svelte -->
<script lang="ts">
	import { Mail, MapPin, Phone } from 'lucide-svelte';

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
		<h2 class="mb-4 text-center text-4xl font-bold">Travaillons ensemble !</h2>
		<p class="mb-12 text-center text-indigo-100">
			Un projet en tête ? N'hésitez pas à me contacter
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
						class="w-full rounded-lg bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm"
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
						class="w-full rounded-lg bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm"
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
						class="w-full rounded-lg bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm"
						placeholder="Votre message..."
					></textarea>
				</div>

				<button
					type="submit"
					disabled={status === 'sending'}
					class="w-full rounded-lg bg-white px-6 py-3 font-bold text-indigo-600 transition-all hover:bg-gray-100"
				>
					{status === 'sending' ? 'Envoi...' : 'Envoyer'}
				</button>

				{#if status === 'success'}
					<p class="text-center text-green-300">✓ Message envoyé !</p>
				{/if}
			</form>

			<!-- Infos de contact -->
			<div class="space-y-6">
				<div class="flex items-center gap-4">
					<Mail size={24} />
					<div>
						<p class="font-medium">Email</p>
						<a href="mailto:ton@email.com" class="text-indigo-200 hover:text-white">
							ton@email.com
						</a>
					</div>
				</div>

				<div class="flex items-center gap-4">
					<Phone size={24} />
					<div>
						<p class="font-medium">Téléphone</p>
						<a href="tel:+33..." class="text-indigo-200 hover:text-white"> +33 X XX XX XX XX </a>
					</div>
				</div>

				<div class="flex items-center gap-4">
					<MapPin size={24} />
					<div>
						<p class="font-medium">Localisation</p>
						<p class="text-indigo-200">Lille, France</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
