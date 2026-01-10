export const numberFormatter = new Intl.NumberFormat(undefined, {
  style: "decimal",
  maximumFractionDigits: 2,
});

export function percent(n: number) {
  return n / 100;
}
