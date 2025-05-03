<script lang="ts">
  import { onMount } from "svelte";
  import type { Pokemon } from "../domain/entities/Pokemon";
  import { Api } from "../infrastructure/api/api";
  export let pokemon_name: string;
  type NestedObject = { [key: string]: any };
  let flattenPokemon: NestedObject = {};
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
    const pokemon = await get_one_pokemon();
    flattenPokemon = flattenObject(pokemon);
    console.log((flattenPokemon = flattenObject(pokemon)));
  });

  function flattenObject(
    obj: NestedObject,
    parentKey = "",
    result: NestedObject = {}
  ): NestedObject {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (
          typeof obj[key] === "object" &&
          obj[key] !== null &&
          !Array.isArray(obj[key])
        ) {
          flattenObject(obj[key], newKey, result);
        } else {
          result[newKey] = obj[key];
        }
      }
    }
    return result;
  }
</script>

<main
  class="min-h-screen bg-gradient-to-r from-red-200 via-yellow-100 to-yellow-50 flex flex-col items-center justify-center p-4"
>
  <div class="mb-8">
    <h1 class="text-4xl font-bold text-center text-red-600">
      Détails du Pokémon
    </h1>
    <div
      class="mb-8 grid grid-cols-1 gap-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-4"
    >
      {#each Object.keys(flattenPokemon) as key}
        {#if Array.isArray(flattenPokemon[key as keyof typeof flattenPokemon])}
          <div>
            <strong>{key}</strong>
          </div>
          {#each Object.values(flattenPokemon[key as keyof typeof flattenPokemon]) as keyArray}
            <div>
              {#each Object.values(keyArray as any[]) as i}
                <span>{i}</span>
              {/each}
            </div>
          {/each}
        {:else}
          <div>
            <strong>{key}</strong>: {flattenPokemon[
              key as keyof typeof flattenPokemon
            ]}
          </div>
        {/if}
      {/each}
    </div>
  </div>
</main>
