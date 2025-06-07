<script lang="ts">
  import { onMount } from "svelte";
  import type { Pokemon } from "../domain/entities/Pokemon";
  import { Api } from "../infrastructure/api/api";
  import { Tools } from "../tools/utils";
  export let pokemon_name: string;
  type NestedObject = { [key: string]: any };
  let flattenPokemon: NestedObject = {};
  const api_pkmn = new Api("https://tyradex.app/api/v1/pokemon");

  async function get_one_pokemon() {
    const pokemon_list: Pokemon[] = await api_pkmn.getter();
    let filtered_pokemon = pokemon_list.filter((pokemon_from_list) => {
      return pokemon_from_list.name.fr
        .toLowerCase()
        .startsWith(pokemon_name.toLowerCase());
    });
    return filtered_pokemon[0];
  }

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

  onMount(async () => {
    const pokemon = await get_one_pokemon();
    flattenPokemon = flattenObject(pokemon);
  });
</script>

<main
  class="min-h-screen bg-gradient-to-r from-blue-800 to-blue-200 flex flex-col items-center justify-center p-4"
>
  <div class="mb-8 w-full flex flex-col items-center">
    <h1 class="text-4xl font-bold text-center text-black">
      {pokemon_name}
    </h1>
    <div
      class="w-4/5 mb-8 grid grid-cols-2 gap-4 rounded-xl shadow-md overflow-hidden p-4"
    >
      {#each Object.keys(flattenPokemon) as key}
        {#if flattenPokemon[key as keyof typeof flattenPokemon]}
          <div class="bg-white rounded p-2">
            <strong>{key}</strong>
            {#if Array.isArray(flattenPokemon[key as keyof typeof flattenPokemon]) && Tools.isNotStringArray(flattenPokemon[key as keyof typeof flattenPokemon])}
              <div
                class="grid grid-cols-{Tools.diviseur_plus_proche_de_racine(
                  flattenPokemon[key as keyof typeof flattenPokemon].length
                )} text-center"
              >
                {#each Object.values(flattenPokemon[key as keyof typeof flattenPokemon]) as keyArray}
                  <div class="w-full m-1">
                    {#each Object.values(keyArray as any[]) as i}
                      {#if Tools.check_url(i)}
                        <img class="w-[2em]" src={i} alt={i} />
                      {:else if typeof i == "boolean"}
                        <div></div>
                      {:else}
                        <div class="w-full m-1 p-1">{i}</div>
                      {/if}
                    {/each}
                  </div>
                {/each}
              </div>
            {:else if Tools.check_url(flattenPokemon[key as keyof typeof flattenPokemon])}
              <img
                class="w-[10em]"
                src={flattenPokemon[key as keyof typeof flattenPokemon]}
                alt={pokemon_name}
              />
            {:else}
              <div>
                {flattenPokemon[key as keyof typeof flattenPokemon]}
              </div>
            {/if}
          </div>
        {/if}
      {/each}
    </div>
  </div>
</main>

<!-- <pre>{JSON.stringify(flattenPokemon, null, 2)}</pre> -->
