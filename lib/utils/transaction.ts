import { percent } from "./number";

export function calculateTransactionFees(
  days: number,
  quantity: number,
  unitValue: number,
) {
  let percentage = percent(2);

  if (days > 1) {
    percentage += (days - 1) * percent(0.5);
  }

  return {
    percentage: percentage * 100,
    total: quantity * unitValue * percentage,
  };
}
