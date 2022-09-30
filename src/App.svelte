<script lang="ts">
  import GraphqlProvider from "./providers/GraphqlProvider.svelte";
  import DefaultLayout from "./layouts/DefaultLayout.svelte";
  import CurrencySelector from "./features/currency-selector/index.svelte";
  import RealtimeChartTickers from "./features/realtime-chart-tickers/index.svelte";
</script>

<GraphqlProvider>
  <DefaultLayout>
    <CurrencySelector />
    <RealtimeChartTickers />
  </DefaultLayout>
</GraphqlProvider>
