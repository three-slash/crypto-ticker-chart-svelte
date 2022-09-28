<script lang="ts">
  import GraphqlProvider from "./providers/GraphqlProvider.svelte";
  import DefaultLayout from "./layouts/DefaultLayout.svelte";
  import CurrencySelector from "./features/currency-selector/index.svelte";
</script>

<GraphqlProvider>
  <DefaultLayout>
    <CurrencySelector />
  </DefaultLayout>
</GraphqlProvider>
