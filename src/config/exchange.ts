export const AVAILABLE_COUNTRIES =
  import.meta.env?.VITE_AVAILABLE_COUNTRIES ?? "";

export const AVAILABLE_PAIRS = import.meta.env?.VITE_AVAILABLE_PAIRS ?? "";

export const BASE_CURRENCY = import.meta.env?.VITE_BASE_CURRENCY ?? "";

export const QUOTE_CURRENCIES = import.meta.env?.VITE_QUOTE_CURRENCIES ?? "";

export const getAvailableCountries = () => AVAILABLE_COUNTRIES.split(",");

export const getAvailablePairs = () => AVAILABLE_PAIRS.split(",");

export const getQuoteCurrencies = () => QUOTE_CURRENCIES.split(",");
