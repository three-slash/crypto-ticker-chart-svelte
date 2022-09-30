import type { Country } from "@services/graphql/queries/useCountries";
import { writable } from "svelte/store";

const createCountryStore = () => writable<Country>();

export const country = createCountryStore();
