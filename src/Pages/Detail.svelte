<script lang="ts">
  import { onMount } from "svelte";
  import type { Pokemon } from "../domain/entities/Pokemon";
  import { Api } from "../infrastructure/api/api";
  export let pokemon_name: string;
  let pokemon_keys: string[];
  let pokemon_values: object[];
  let pokemon: Pokemon;
  const api_pkmn = new Api("https://tyradex.app/api/v1/pokemon");
  async function get_one_pokemon() {
    const pokemon_list: Pokemon[] = await api_pkmn.getter();
    let p = pokemon_list.filter((pokemon) => {
      return pokemon.name.fr
        .toLowerCase()
        .startsWith(pokemon_name.toLowerCase());
    });
    return p[0];
  }
  onMount(async () => {
    pokemon = await get_one_pokemon();
    pokemon_keys = Object.keys(pokemon);
    pokemon_values = Object.values(pokemon);
  });
</script>

<div
  class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
>
  <div class="md:flex">
    <div class="md:flex-shrink-0">
      {#if pokemon}
        pokemon_name={pokemon.name.fr}
        {#each pokemon_keys as key, index}
          <div>
            {key}:{JSON.stringify(pokemon_values[index])}
          </div>
        {/each}
      {:else}
        Ce pokemon se trouve surement dans la prochaine génération
      {/if}
    </div>
  </div>
</div>
