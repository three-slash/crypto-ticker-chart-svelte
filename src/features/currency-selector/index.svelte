<script lang="ts">
  import useCountries, {
    type Country,
  } from "@services/graphql/queries/useCountries";
  import CountrySelect from "@components/CountrySelect.svelte";

  let selectedCountry;
  let countries: Array<Country> = [];

  const handleOnSelect = (country: CustomEvent<Country>) => {
    selectedCountry = country.detail;
  };

  const fetchingCountries = useCountries();

  $: {
    // Only filter 5 countrys
    countries = ($fetchingCountries?.data ?? []).filter((item) =>
      ["US", "HK", "ID", "JP", "DE"].includes(item.code)
    );
  }
</script>

<CountrySelect
  label="Select your country"
  bind:selected={selectedCountry}
  bind:isLoading={$fetchingCountries.isLoading}
  on:select={handleOnSelect}
  {countries}
/>
