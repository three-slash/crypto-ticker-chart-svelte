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
  isCompact?: boolean;
};

export const formatCurrency = ({
  currency,
  countryCode,
  number,
  isCompact,
  digit: minimumFractionDigits,
}: FormatCurrencyOptions) =>
  !countryCode
    ? number
    : new Intl.NumberFormat(getLocaleByCode(countryCode), {
        style: "currency",
        notation: isCompact ? "compact" : undefined,
        currency,
        minimumFractionDigits,
      }).format(number);
