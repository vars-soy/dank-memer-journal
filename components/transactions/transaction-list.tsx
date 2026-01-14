import type { Transaction } from "@/generated/prisma/client";
import { TransactionItem } from "./transaction-item";

type TransactionListProps = {
  transactions: Transaction[];
};

export function TransactionList({ transactions }: TransactionListProps) {
  if (!transactions.length) {
    return (
      <div className="flex flex-col items-start">
        <p className="text-muted-foreground text-sm">
          You have no recorded transactions yet.
        </p>
        <p className="text-muted-foreground text-sm">
          Add the first one from the actions menu.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4">
      {transactions.map((t) => (
        <TransactionItem key={t.id} transaction={t} />
      ))}
    </div>
  );
}
