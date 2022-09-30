import { getLocaleByCode } from "@utils/locale";

export const formatNumber = (
  countryCode: string,
  number: number,
  digit: number = 2
) =>
  !countryCode
    ? number
    : new Intl.NumberFormat(getLocaleByCode(countryCode), {
        notation: "compact",
        minimumFractionDigits: digit,
      }).format(number);

type FormatCurrencyOptions = {
  currency: string;
  countryCode: string;
  number: number;
  digit?: number;
};

export const formatCurrency = ({
  currency,
  countryCode,
  number,
  digit: minimumFractionDigits,
}: FormatCurrencyOptions) =>
  !countryCode
    ? number
    : new Intl.NumberFormat(getLocaleByCode(countryCode), {
        style: "currency",
        currency,
        minimumFractionDigits,
      }).format(number);
