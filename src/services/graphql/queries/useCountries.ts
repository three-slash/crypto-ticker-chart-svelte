import { request, gql } from "graphql-request";
import { useQuery, type UseQueryOptions } from "@sveltestack/svelte-query";
import { first } from "radash";

export type Currency = {
  id: string;
  code: string;
  name: string;
  symbol: string;
};

export type Country = {
  id: string;
  name: string;
  code: string;
  currency: Currency;
};

type ApiSuccessResponse = {
  countries?: {
    edges: Array<{
      node: Omit<Country, "currency"> & {
        currencies: {
          edges: Array<{
            node: Currency;
          }>;
        };
      };
    }>;
  };
};

type ApiErrorResponse = {
  message: string;
};

const COUNTRIES_QUERY = gql`
  {
    countries {
      edges {
        node {
          id
          name
          code: alpha2Code
          currencies {
            edges {
              node {
                id
                code
                name
                symbol
              }
            }
          }
        }
      }
    }
  }
`;

const getCountries = async (): Promise<ApiSuccessResponse> =>
  request(import.meta.env.VITE_COUNTRY_API_ENDPOINT, COUNTRIES_QUERY);

const useCountries = () => {
  return useQuery<ApiSuccessResponse, ApiErrorResponse, Array<Country>>(
    "getCountries",
    () => getCountries(),
    {
      select(data) {
        return (data?.countries?.edges ?? []).map(({ node }) => {
          const { currencies, ...country } = node;
          const currency = first(currencies.edges.map(({ node }) => node));
          return {
            ...country,
            currency,
          };
        });
      },
    }
  );
};

export default useCountries;
