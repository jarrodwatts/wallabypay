const formatter = Intl.NumberFormat("en", { notation: "compact" });

export default function formatNumber(number: number) {
  return formatter.format(number);
}
