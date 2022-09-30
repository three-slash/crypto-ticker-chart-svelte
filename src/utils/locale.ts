import { getAlpha3ByAlpha2 } from "country-locale-map";

export const getLocaleByCode = (countryCode: string = "en-US") =>
  getAlpha3ByAlpha2(countryCode);
