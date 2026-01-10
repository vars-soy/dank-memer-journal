import { cva } from "class-variance-authority";
import {
  BadgeCheckIcon,
  BadgeIcon,
  BadgeMinusIcon,
  BadgeXIcon,
} from "lucide-react";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Item, ItemContent } from "@/components/ui/item";
import { cn } from "@/lib/utils/cn";
import type { Transaction } from "@/generated/prisma/client";
import type { VariantProps } from "class-variance-authority";
import { calculateTransactionFees } from "@/lib/utils/transaction";
import { TRANSACTION_STATUS } from "@/lib/db/enums";
import { TransactionItemActionMenu } from "./transaction-item-action-menu";
import { Currency } from "../currency";

type TransactionItemProps = {
  transaction: Transaction;
};

const statusBadgeVariant = cva("capitalize", {
  variants: {
    status: {
      [TRANSACTION_STATUS.ACTIVE]:
        "bg-sky-400/25 text-sky-700 capitalize dark:text-sky-500",
      [TRANSACTION_STATUS.EXPIRED]:
        "bg-amber-400/25 text-amber-700 capitalize dark:text-amber-500",
      [TRANSACTION_STATUS.FULFILLED]:
        "bg-green-400/25 text-green-700 capitalize dark:text-green-500",
      [TRANSACTION_STATUS.REMOVED]:
        "bg-red-400/25 text-red-700 capitalize dark:text-red-500",
    },
  },
});

export function TransactionItem({ transaction }: TransactionItemProps) {
  const fee = useMemo(
    () =>
      calculateTransactionFees(
        transaction.days,
        transaction.quantity,
        transaction.unitValue,
      ),
    [transaction.days, transaction.quantity, transaction.unitValue],
  );

  const balance = useMemo(
    () => transaction.unitValue * transaction.fulfilledQuantity - fee.total,
    [fee.total, transaction.fulfilledQuantity, transaction.unitValue],
  );

  const fulfilledUnitValue = useMemo(
    () =>
      transaction.fulfilledQuantity > 0
        ? balance / transaction.fulfilledQuantity
        : 0,
    [balance, transaction.fulfilledQuantity],
  );

  const StatusBadgeIcon = useMemo(() => {
    switch (transaction.status) {
      case TRANSACTION_STATUS.ACTIVE:
        return BadgeIcon;
      case TRANSACTION_STATUS.EXPIRED:
        return BadgeXIcon;
      case TRANSACTION_STATUS.FULFILLED:
        return BadgeCheckIcon;
      case TRANSACTION_STATUS.REMOVED:
        return BadgeMinusIcon;
    }
  }, [transaction.status]);

  return (
    <Item variant="outline" className="p-0">
      <ItemContent>
        <div className="flex items-center justify-between gap-x-2 border-b p-4 lg:p-6">
          <div className="flex items-center gap-x-1">
            <p className="bg-muted text-muted-foreground rounded-sm px-2.5 py-1 font-mono text-xs">
              {transaction.marketId}
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-1">
              <Badge className="bg-slate-400/25 text-slate-500 dark:text-slate-400">
                {transaction.days}d
              </Badge>
              <Badge className="bg-purple-400/25 text-purple-700 capitalize dark:text-purple-400">
                {transaction.type.toLowerCase()}
              </Badge>
              <Badge
                className={statusBadgeVariant({ status: transaction.status })}
              >
                <StatusBadgeIcon />
                {transaction.status.toLowerCase()}
              </Badge>
            </div>
            <TransactionItemActionMenu transaction={transaction} />
          </div>
        </div>
        <div className="flex flex-col gap-y-2 p-4 lg:p-6">
          <Detail variant="row">
            <Label>Quantity:</Label>
            <Value>{transaction.quantity}</Value>
          </Detail>
          <Detail variant="row">
            <Label>Fulfilled:</Label>
            <Value>{transaction.fulfilledQuantity}</Value>
          </Detail>
          <Detail variant="row">
            <Label>Unit Value:</Label>
            <Value className="flex items-center">
              <Currency value={transaction.unitValue} />
            </Value>
          </Detail>
          <Detail variant="row">
            <Label>Fee:</Label>
            <Value className="flex items-center">
              <Currency value={fee.total} />
              &nbsp;
              <span>({fee.percentage}%)</span>
            </Value>
          </Detail>
          <Detail variant="row">
            <Label>Fulfilled Unit Value:</Label>
            <Value className="flex items-center">
              <Currency value={fulfilledUnitValue} />
            </Value>
          </Detail>
          <Detail variant="row">
            <Label>Balance:</Label>
            <Value
              className={cn(
                "flex items-center",
                balance > 0 && "text-green-600 dark:text-green-500",
                balance < 0 && "text-red-600 dark:text-red-500",
              )}
            >
              <Currency value={balance} />
            </Value>
          </Detail>
        </div>
      </ItemContent>
    </Item>
  );
}
const detailVariants = cva("flex", {
  variants: {
    variant: {
      column: "flex-col gap-y-1",
      row: "flex-row gap-x-1 items-center",
    },
  },
  defaultVariants: {
    variant: "column",
  },
});

type DetailProps = React.PropsWithChildren<
  Pick<React.ComponentProps<"p">, "className"> &
    VariantProps<typeof detailVariants>
>;

function Detail({ className, children, variant }: DetailProps) {
  return (
    <div className={detailVariants({ variant, className })}>{children}</div>
  );
}

type LabelProps = {
  children: string;
};

function Label({ children }: LabelProps) {
  return <p className="text-sm font-semibold select-none">{children}</p>;
}

function Value({
  className,
  children,
}: React.PropsWithChildren<Pick<React.ComponentProps<"p">, "className">>) {
  return <p className={cn("text-sm font-normal", className)}>{children}</p>;
}
