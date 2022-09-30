// import { request, gql } from "graphql-request";
import { useQuery, type UseQueryOptions } from "@sveltestack/svelte-query";

import { EXCHANGE_RATES_API_ENDPOINT } from "@config/endpoint";
import { EXCHANGE_RATES_API_KEY } from "@config/secrets";
import { BASE_CURRENCY } from "@/config/exchange";

export type Currency = {
  id: string;
  code: string;
  name: string;
  symbol: string;
};

export type Rates = Record<string, number>;

type ApiSuccessResponse = {
  base: string;
  date: string;
  rates: Rates;
  success: boolean;
  timestamp: number;
};

type ApiErrorResponse = {
  message: string;
};

// TODO: Use GraphQL API
// Because I can't found free GraphQL API for exchange rates, I ended up using REST API,
// There is exchange rates GQL API called `swop` but it's not exactly free
const getExchangeRates = async (
  baseCurrency: string,
  quoteCurrencies: string[]
): Promise<ApiSuccessResponse> => {
  // const headers = new Headers();
  // headers.append("apikey", EXCHANGE_RATES_API_KEY);

  // const endpoint = `${EXCHANGE_RATES_API_ENDPOINT}/exchangerates_data/latest?base=${baseCurrency}&symbols=${quoteCurrencies.join(
  //   ","
  // )}`;
  // const response = await fetch(endpoint, {
  //   headers,
  // });
  // const json = await response.json();
  // return json;
  return {
    success: true,
    timestamp: 1664506744,
    base: "USD",
    date: "2022-09-30",
    rates: {
      HKD: 7.84975,
      IDR: 15229.8,
      JPY: 144.669036,
      EUR: 1.019115,
    },
  };
};

const useExchangeRates = (
  baseCurrency: string,
  quotesCurrencies: string[],
  options?: UseQueryOptions<ApiSuccessResponse, ApiErrorResponse, Rates>
) => {
  return useQuery<ApiSuccessResponse, ApiErrorResponse, Rates>(
    "getExchangeRates",
    () => getExchangeRates(baseCurrency, quotesCurrencies),
    {
      ...options,
      cacheTime: 1000,
      select(data) {
        return {
          [BASE_CURRENCY]: 1,
          ...data.rates,
        };
      },
    }
  );
};

export default useExchangeRates;
