<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./Pages/Home.svelte";
  import Detail from "./Pages/Detail.svelte";
  let url = "";
</script>

<Router {url}>
  <nav class="h-14 bg-gradient-to-r from-blue-800 to-blue-200 flex">
    <Link to="/"
      ><div
        class="text-2xl font-bold text-black font-mono bg-white rounded p-2 m-2"
      >
        Home
      </div></Link
    >
  </nav>
  <div>
    <Route path="/"><Home /></Route>
    <Route path="/:nom" let:params><Detail pokemon_name={params.nom} /></Route>
  </div>
</Router>
