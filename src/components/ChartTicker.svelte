<script lang="ts">
  import { formatCurrency, formatNumber } from "@utils/number";
  import SkeletonLoader from "@components/SkeletonLoader.svelte";

  export let pairs;
  export let price;
  export let volume;
  export let currency;
  export let rates;
  export let locale;
  export let isLoading;
  export let shouldShowExtraDigit = false;

  $: formattedPrice = parseFloat(price);
  $: formattedRates = formatCurrency({
    currency,
    countryCode: locale,
    number: Number(rates) * Number(price),
    digit: shouldShowExtraDigit ? 8 : 2,
  });
  $: formattedVolume = formatNumber(locale, volume);
</script>

<div
  class="flex flex-col gap-4 w-[250px] bg-white transform hover:scale-105 transition-transform"
>
  <div class="flex flex-col shadow-lg rounded-lg p-5 pb-12">
    <div class="flex justify-between mb-2">
      <div>{pairs}</div>
      <div class="text-green-500">+0.73%</div>
    </div>

    <div class="flex items-center text-xl font-bold">
      {#if isLoading}
        <SkeletonLoader />
      {:else}
        {formattedPrice}
      {/if}
    </div>

    <div class="flex items-center gap-1 text-sm font-bold">
      Volume:
      {#if isLoading}
        <SkeletonLoader />
      {:else}
        {formattedVolume}
      {/if}
    </div>
  </div>

  <div class="text-sm font-bold">
    {#if isLoading}
      <SkeletonLoader />
    {:else}
      {currency}
      {formattedRates}
    {/if}
  </div>
</div>
