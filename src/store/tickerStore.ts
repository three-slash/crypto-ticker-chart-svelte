import { getAvailablePairs } from "@config/exchange";
import { writable } from "svelte/store";

const createTickerStore = () => {
  const pairs = getAvailablePairs();
  const pairsObject = Object.fromEntries(pairs.map((key) => [key, {}]));
  const $tickers = writable(pairsObject);
  return $tickers;
};

export const ticker = createTickerStore();
