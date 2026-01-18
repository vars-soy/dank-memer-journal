export function calcTransactionFeePercentage(
  fee: number,
  quantity: number,
  unitValue: number,
) {
  return (fee / (quantity * unitValue)) * 100;
}
