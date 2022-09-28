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
    dispatch("select", selectedCountry);
    handleClosePopover();
  };

  onMount(() => {
    input?.focus?.();
  });
</script>

<div
  class="group flex flex-col gap-1"
  on:click={handleOpenPopover}
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

  <div class="relative">
    {#if isPopOverOpen}
      <ul class="absolute top-1 left-0 w-full bg-white shadow-sm">
        {#each countries as country (country.id)}
          <li
            class="p-2 hover:cursor-pointer border-b border-b-slate-100 text-lg text-slate-700 last:border-0"
            on:click={() => handleOnSelect(country)}
          >
            {country.name}
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
