<script lang="ts">
  import Search from "../lib/Search.svelte";
  import Generation from "../lib/Generation.svelte";
  import { Api } from "../infrastructure/api/api";
  import { onMount } from "svelte";
  import type { Pokemon } from "../domain/entities/Pokemon";

  const api_pkmn = new Api("https://tyradex.app/api/v1/pokemon");
  let pokemon_list: Pokemon[] = [];
  let display_pokemon: Pokemon[] = [];

  function update_pokemon(new_pokemons: Pokemon[]) {
    display_pokemon = new_pokemons;
  }

  async function get_pokemon() {
    pokemon_list = await api_pkmn.getter();
    display_pokemon = pokemon_list;
  }

  onMount(() => {
    get_pokemon();
  });
</script>

<main
  class="min-h-screen bg-gradient-to-r from-blue-800 to-blue-200 flex flex-col items-center justify-center p-4"
>
  <div class="mb-8">
    <a
      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      target="_blank"
      rel="noreferrer"
    >
      <img
        src="https://www.pokepedia.fr/images/0/0c/Professeur_Chen-LGPE.png"
        class="logo transition-transform duration-300 transform hover:scale-105"
        alt="Pokémon Logo"
        width="300"
        height="400"
      />
    </a>
  </div>
  <Search {pokemon_list} {update_pokemon} />
  <div class="mb-8 grid grid-cols-3 gap-4">
    {#each display_pokemon as pokemon}
      <!-- <div>
          {pokemon.name.fr}
        </div> -->
      <Generation {pokemon} />
    {/each}
    <!-- {JSON.stringify(display_pokemon,null,2)} -->
  </div>
</main>

<style>
  .logo {
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #ffcc00aa);
  }
</style>
