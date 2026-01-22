import React from "react";

type CurrencyIconProps = {
  currency: string; // e.g. "NGN", "USD", "EUR"
};

const CURRENCY_SYMBOLS: Record<string, string> = {
  NGN: "₦",
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
};

export const CurrencyIcon = ({ currency }: CurrencyIconProps) => {
  return <span>{CURRENCY_SYMBOLS[currency] ?? currency}</span>;
};
