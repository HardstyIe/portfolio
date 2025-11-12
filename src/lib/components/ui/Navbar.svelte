<!-- src/lib/components/ui/Navbar.svelte -->
<script lang="ts">
  let scrolled = $state(false);
  
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

<nav class="fixed top-0 z-50 w-full transition-all duration-300"
     class:bg-white={scrolled}
     class:shadow-md={scrolled}
     class:bg-transparent={!scrolled}>
  <div class="container mx-auto flex items-center justify-between px-6 py-4">
    <!-- Logo -->
    <button onclick={() => scrollToSection('hero')} 
            class="text-2xl font-bold text-gray-900">
      Portfolio
    </button>
    
    <!-- Navigation -->
    <ul class="flex gap-8">
      {#each sections as section}
        <li>
          <button 
            onclick={() => scrollToSection(section.id)}
            class="text-gray-700 transition-colors hover:text-indigo-600">
            {section.label}
          </button>
        </li>
      {/each}
    </ul>
    
    <!-- CTA -->
    <a href="#contact" 
       class="rounded-full bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700">
      Me contacter
    </a>
  </div>
</nav>
