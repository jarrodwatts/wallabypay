const formatter = Intl.NumberFormat("en", { notation: "compact" });

/**
 * Useful function to format the user's balance.
 */
export default function formatNumber(number: number) {
  return formatter.format(number);
}
