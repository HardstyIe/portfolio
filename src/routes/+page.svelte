<script lang="ts">
	let chatInput = '';
	let reply = '';
	const userId = 'demo-user';

	async function sendMessage() {
		const res = await fetch('/api/chatbot', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ chatInput, userId })
		});
		const data = await res.json();
		reply = data.reply;
		chatInput = '';
	}
</script>

<main class="p-6">
	<h1 class="mb-4 text-3xl">Mon Portfolio</h1>

	<div class="mb-4">
		<input bind:value={chatInput} placeholder="Pose ta question..." class="w-full border p-2" />
		<button on:click={sendMessage} class="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
			>Envoyer</button
		>
	</div>

	{#if reply}
		<div class="rounded border bg-gray-100 p-4">
			<strong>Assistant:</strong>
			<p>{reply}</p>
		</div>
	{/if}
</main>
