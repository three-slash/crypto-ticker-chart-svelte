<script lang="ts">
  import useCountries, {
    type Country,
  } from "@services/graphql/queries/useCountries";
  import { getAvailableCountries } from "@/config/exchange";
  import { country } from "@store/countryStore";
  import { currency } from "@store/currencyStore";
  import CountrySelect from "@components/CountrySelect.svelte";

  let filteredCountries: Array<Country>;

  const availableCountries = getAvailableCountries();
  const countries = useCountries();

  const handleOnSelect = (selectedCountry: CustomEvent<Country>) => {
    $currency = selectedCountry.detail.currency.code;
    $country = selectedCountry.detail;
  };

  $: {
    filteredCountries = ($countries?.data ?? []).filter((item) =>
      availableCountries.includes(item.code)
    );
    const defaultCountry = filteredCountries.find((item) => item.code === "US");
    $country = defaultCountry;
    $currency = defaultCountry?.currency?.code;
  }
</script>

<div id="currency-selector" class="w-[400px] my-0 mx-auto">
  <CountrySelect
    label="Select your country"
    countries={filteredCountries}
    bind:selected={$country}
    bind:isLoading={$countries.isLoading}
    on:select={handleOnSelect}
  />
</div>
