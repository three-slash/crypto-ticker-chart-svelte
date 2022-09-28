import { writable } from "svelte/store";

const createCounter = () => {
  const { subscribe, update } = writable(0);
  const increment = () => update((state) => state + 1);
  const decrement = () => update((state) => state + 1);

  return {
    subscribe,
    increment,
    decrement,
  };
};

export const count = createCounter();
