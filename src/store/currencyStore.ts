import { writable } from "svelte/store";

const createCurrencyStore = () => writable<string>();

export const currency = createCurrencyStore();
