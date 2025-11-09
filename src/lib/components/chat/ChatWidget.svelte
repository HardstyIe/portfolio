<script lang="ts">
	import ChatBubble from '$lib/components/chat/ChatBubble.svelte';
	import ChatWindow from '$lib/components/chat/ChatWindow.svelte';

	// États réactifs
	let isOpen = $state(false);
	let messages = $state([
		{
			role: 'assistant',
			content:
				"Salut ! 👋 Je suis l'assistant du portfolio. Pose-moi des questions sur les projets, compétences ou expériences !",
			timestamp: new Date()
		}
	]);

	function toggleChat() {
		isOpen = !isOpen; // toggle avec $isOpen
	}
</script>

<div class="fixed right-5 bottom-5 z-9999">
	{#if isOpen}
		<ChatWindow {messages} onClose={toggleChat} />
	{/if}
	{#if !isOpen}
		<ChatBubble {isOpen} onClick={toggleChat} />
	{/if}
</div>
