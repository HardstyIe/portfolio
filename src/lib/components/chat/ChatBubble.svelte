<script>
	let { isOpen, onClick } = $props();
</script>

<button
	class="relative flex h-15 w-15 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-indigo-500/40 md:h-12 md:w-12"
	onclick={onClick}
	aria-label={isOpen ? 'Fermer le chat' : 'Ouvrir le chat'}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
	>
		<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
	</svg>
</button>
