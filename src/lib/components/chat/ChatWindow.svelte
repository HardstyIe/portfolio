<script lang="ts">
	import { enhance } from '$app/forms';
	import { loadMessages, saveMessages } from '$lib/utils/chatStorage';
	import { renderMarkdown } from '$lib/utils/markdown';
	import { onMount, tick } from 'svelte';

	let { messages = $bindable([]), onClose } = $props();

	let input = $state('');
	let isLoading = $state(false);
	let messagesContainer: HTMLDivElement | null = null;

	// Charger les messages au montage du composant
	onMount(() => {
		const savedMessages = loadMessages();
		if (savedMessages.length > 0) {
			messages = savedMessages;
		}
	});

	// Sauvegarder les messages à chaque changement
	$effect(() => {
		if (messages.length > 0) {
			saveMessages(messages);
			scrollToBottom();
		}
	});

	async function scrollToBottom() {
		await tick();
		if (messagesContainer) {
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		}
	}

	function handleKeyDown(e: KeyboardEvent & { currentTarget: HTMLTextAreaElement }) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			const form = e.currentTarget.form;
			form?.requestSubmit();
		}
	}
</script>

<div class="flex h-[500px] w-[350px] flex-col overflow-hidden rounded-lg bg-white shadow-xl">
	<!-- Header -->
	<div class="flex items-center justify-between border-b p-4">
		<div class="flex items-center gap-3">
			<div
				class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
					<circle cx="12" cy="7" r="4"></circle>
				</svg>
			</div>
			<div>
				<h3 class="font-semibold">Assistant Portfolio</h3>
				<p class="flex items-center gap-2 text-sm text-gray-500">
					<span class="h-2 w-2 rounded-full bg-green-500"></span>
					En ligne
				</p>
			</div>
		</div>
		<button
			onclick={onClose}
			class="rounded-full p-2 text-gray-500 hover:bg-gray-100"
			aria-label="Fermer"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<line x1="18" y1="6" x2="6" y2="18"></line>
				<line x1="6" y1="6" x2="18" y2="18"></line>
			</svg>
		</button>
	</div>

	<!-- Messages -->
	<div class="flex-1 overflow-y-auto p-4" bind:this={messagesContainer}>
		{#each messages as message (message.timestamp)}
			<div class="mb-4 flex {message.role === 'user' ? 'justify-end' : 'justify-start'}">
				<div
					class="max-w-[80%] rounded-lg {message.role === 'user'
						? 'bg-indigo-600 text-white'
						: 'bg-gray-100 text-gray-800'} p-3"
				>
					<!-- Contenu avec markdown -->
					<div
						class="prose prose-sm max-w-none text-sm
                     {message.role === 'user' ? 'prose-invert' : ''}
                     prose-p:my-2 prose-p:first:mt-0 prose-p:last:mb-0
                     prose-a:underline prose-strong:font-semibold prose-code:rounded prose-code:bg-black/10 prose-code:px-1.5
                     prose-code:py-0.5 prose-code:text-xs prose-pre:rounded
                     prose-pre:bg-black/5 prose-pre:p-2 prose-ol:my-2 prose-ol:pl-6
                     prose-ul:my-2
                     prose-ul:pl-6 prose-li:my-0.5
                     {message.role === 'user'
							? 'prose-code:bg-white/20 prose-pre:bg-white/10'
							: ''}"
					>
						{@html renderMarkdown(message.content)}
					</div>

					<span class="mt-1 block text-right text-xs opacity-75">
						{message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
					</span>
				</div>
			</div>
		{/each}

		{#if isLoading}
			<div class="mb-4 flex justify-start">
				<div class="flex max-w-[80%] gap-1 rounded-lg bg-gray-100 p-3">
					<span class="h-2 w-2 animate-bounce rounded-full bg-gray-400"></span>
					<span class="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.2s]"
					></span>
					<span class="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.4s]"
					></span>
				</div>
			</div>
		{/if}
	</div>

	<!-- Form -->
	<form
		class="border-t p-4"
		method="POST"
		action="/api/chatbot?/sendMessage"
		use:enhance={() => {
			if (input.trim()) {
				messages = [
					...messages,
					{
						role: 'user',
						content: input,
						timestamp: new Date()
					}
				];
				input = '';
				isLoading = true;
			}

			return async ({ result, update }) => {
				isLoading = false;

				if (result.type === 'success' && result.data?.message) {
					messages = [
						...messages,
						{
							role: 'assistant',
							content: result.data.message,
							timestamp: new Date()
						}
					];
				} else if (result.type === 'failure') {
					messages = [
						...messages,
						{
							role: 'assistant',
							content: `Erreur: ${result.data?.error || 'Une erreur est survenue'}`,
							timestamp: new Date()
						}
					];
				}

				await update();
			};
		}}
	>
		<div class="flex gap-2">
			<textarea
				name="message"
				bind:value={input}
				onkeydown={handleKeyDown}
				placeholder="Pose ta question..."
				rows="1"
				disabled={isLoading}
				class="flex-1 resize-none rounded-lg border p-2 focus:border-indigo-500 focus:outline-none disabled:bg-gray-50"
			></textarea>
			<button
				type="submit"
				disabled={isLoading || !input.trim()}
				aria-label="Envoyer"
				class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white transition-colors hover:bg-indigo-700 disabled:bg-gray-300"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<line x1="22" y1="2" x2="11" y2="13"></line>
					<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
				</svg>
			</button>
		</div>
	</form>
</div>
