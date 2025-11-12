<!-- src/routes/+page.svelte -->
<script lang="ts">
	import About from '$lib/components/sections/About.svelte';
	import Contact from '$lib/components/sections/Contact.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import Projects from '$lib/components/sections/Projects.svelte';
	import Skills from '$lib/components/sections/Skills.svelte';
</script>

<Hero />
<About />
<Skills />
<Projects />
<Contact />
