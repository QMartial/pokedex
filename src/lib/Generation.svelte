<script lang="ts">
  import type { Pokemon } from "../domain/entities/Pokemon";
  import { Link } from "svelte-routing";
  export let pokemon: Pokemon;
</script>

<div
  class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
>
  <div class="md:flex">
    <div class="md:flex-shrink-0">
      <Link to="/{pokemon.name.fr}">
        <img
          class="h-48 w-full object-cover md:w-48 transition-transform duration-300 transform hover:scale-105"
          src={pokemon.sprites.regular}
          alt="Pokémon Logo"
        />
      </Link>
    </div>
    <div class="p-8">
      <div
        class="uppercase tracking-wide text-sm text-indigo-500 font-semibold"
      >
        {pokemon.category}
      </div>
      <h1
        class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
      >
        {pokemon.name.fr}
      </h1>
      <p class="mt-2 text-gray-500">ID Pokédex: {pokemon.pokedex_id}</p>
      <p class="mt-2 text-gray-500">Génération: {pokemon.generation}</p>
    </div>
  </div>
</div>
