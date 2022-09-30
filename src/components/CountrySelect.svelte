<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import SearchIcon from "svelte-icons/io/IoIosSearch.svelte";
  import ChevronDown from "svelte-icons/io/IoIosArrowDown.svelte";
  import ChevronUp from "svelte-icons/io/IoIosArrowUp.svelte";

  import type { Country } from "@services/graphql/queries/useCountries";
  import clickOutside from "@directives/clickOutside";

  const dispatch = createEventDispatcher();

  // Props
  export let label = "Select country";
  export let placeholder = "Search";
  export let countries: Array<Country> = [];
  export let selected: Country;
  export let isLoading = false;
  export let loadingLabel = "Fetching Countries...";

  // States
  let searchValue = "";
  let isPopOverOpen = false;
  let input: HTMLInputElement;

  // Events
  const handleOpenPopover = () => {
    input?.focus?.();
    isPopOverOpen = true;
  };

  const handleClosePopover = () => {
    isPopOverOpen = false;
  };

  const handleOnSelect = (selectedCountry: Country) => {
    input?.focus?.();
    isPopOverOpen = false;
    searchValue = selectedCountry.name;
    dispatch("select", selectedCountry);
  };

  onMount(() => {
    input?.focus?.();
  });
</script>

<div
  class="group flex flex-col gap-1"
  use:clickOutside
  on:clickOutside={handleClosePopover}
>
  <div class="text-slate-400 cursor-pointer" on:click={handleOpenPopover}>
    {label}
  </div>
  <div
    class:border-indigo-400={isPopOverOpen}
    class:border-transparent={!isPopOverOpen}
    class="border-2 group-focus-within:border-indigo-400 flex items-center gap-2 p-3 bg-slate-100 rounded-md min-w-[400px]"
    on:click={handleOpenPopover}
  >
    {#if isLoading}
      <div class="text-slate-500">{loadingLabel}</div>
    {:else}
      <div class="flex items-center w-6 text-slate-400">
        <SearchIcon />
      </div>

      <input
        bind:this={input}
        bind:value={searchValue}
        on:focus={handleOpenPopover}
        class="text-md text-slate-500 outline-none bg-transparent flex-1"
        {placeholder}
      />

      <div
        class:text-indigo-500={isPopOverOpen}
        class="flex items-center w-4 cursor-pointer text-slate-300 ml-auto"
      >
        {#if isPopOverOpen}
          <ChevronUp />
        {:else}
          <ChevronDown />
        {/if}
      </div>
    {/if}
  </div>

  <div class="relative z-[1000]">
    {#if isPopOverOpen}
      <ul class="absolute top-1 left-0 w-full bg-white shadow-sm">
        {#each countries as country (country.id)}
          <li
            class:text-indigo-500={country.id === selected?.id}
            class="flex items-center gap-4 py-2 px-6 hover:cursor-pointer border-b border-b-slate-100 text-lg text-slate-500 opacity-80 hover:text-slate-700 hover:opacity-100 last:border-0"
            on:click={() => handleOnSelect(country)}
          >
            <div
              class="flag rounded-full w-6 h-6"
              style={`background-image: url('http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code}.svg')`}
            />
            <span>{country.name}</span>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style>
  .flag {
    background-size: cover;
    background-position: 50% 50%;
  }
</style>
