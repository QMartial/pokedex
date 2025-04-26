<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./Pages/Home.svelte";
  import Detail from "./Pages/Detail.svelte";
  export let url = "";
</script>

<Router {url}>
  <nav>
    <Link to="/">Home</Link>
  </nav>
  <div>
    <Route path="/"><Home /></Route>
    <Route path="/:nom" let:params><Detail pokemon_name={params.nom} /></Route>
  </div>
</Router>
