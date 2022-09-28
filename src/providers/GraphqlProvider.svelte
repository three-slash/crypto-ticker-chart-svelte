<script lang="ts">
  import { QueryClientProvider } from "@sveltestack/svelte-query/";
</script>

<QueryClientProvider>
  <slot />
</QueryClientProvider>
