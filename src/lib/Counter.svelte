<script lang="ts">
  let count: number = 0
  const increment = () => {
    count += 2
  }
</script>

<button onclick={increment}>
  count is {count}
</button>
