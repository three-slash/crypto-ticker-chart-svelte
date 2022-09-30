<script lang="ts">
  import { onMount } from "svelte";
  import useExchangeRates from "@services/graphql/queries/useExchangeRates";
  import useTickers, { TICK_EVENT } from "@/services/ws/useTickers";
  import { getAvailablePairs } from "@config/exchange";
  import { BASE_CURRENCY, getQuoteCurrencies } from "@config/exchange";
  import { country } from "@store/countryStore";
  import { currency } from "@store/currencyStore";
  import { ticker } from "@store/tickerStore";
  import ChartTicker from "@components/ChartTicker.svelte";
  import { getLocaleByCode } from "@/utils/locale";

  const availablePairs = getAvailablePairs();
  const quoteCurrencies = getQuoteCurrencies();
  const exchangeRates = useExchangeRates(BASE_CURRENCY, quoteCurrencies);

  // WS Subscription hardcoded
  useTickers();

  const onTick = (event: CustomEvent) => {
    Object.keys(event.detail).map((pairs) => {
      $ticker[pairs] = event.detail[pairs];
    });
  };

  $: localeCountry = getLocaleByCode($country?.code);
  $: currencyRates = $exchangeRates?.data?.[$currency] ?? 1;

  onMount(() => {
    document.addEventListener(TICK_EVENT, onTick);
    return () => {
      document.removeEventListener(TICK_EVENT, onTick);
    };
  });
</script>

<div class="flex items-center gap-4">
  {#each availablePairs as pairs}
    <ChartTicker
      isLoading={!$ticker?.[pairs]?.ohlc || !$country}
      currency={$currency}
      locale={localeCountry}
      rates={currencyRates}
      price={$ticker?.[pairs]?.ohlc?.closeStr}
      volume={$ticker?.[pairs]?.volumeQuoteStr}
      shouldShowExtraDigit={pairs === "SHIB/USDT"}
      {pairs}
    />
  {/each}
</div>
