<script lang="ts">
  import type { Pokemon } from "../domain/entities/Pokemon";

  export let pokemon_list: Pokemon[] = [];
  export let update_pokemon: (pokemon: Pokemon[]) => void;
  let nom: string = "";

  $: search = () => {
    const display_pokemon = pokemon_list.filter((pokemon) => {
      return pokemon.name.fr.toLowerCase().startsWith(nom.toLowerCase());
    });
    update_pokemon(display_pokemon);
  };

  // Appeler la fonction search initialement pour afficher tous les pokémons
  $: search();
</script>

<div class="p-2 m-2 flex items-center justify-center">
  <div class="bg-white p-8 rounded-lg shadow-lg text-center flex flex-col">
    <h1 class="text-3xl font-bold text-blue-900 mb-4">
      Bonjour, bienvenue dans le monde de pokemon!
    </h1>
    <input
      bind:value={nom}
      class="border-2 border-blue-500 rounded-full px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
      placeholder="Cherchez un Pokémon"
      on:input={search}
    />
  </div>
</div>
