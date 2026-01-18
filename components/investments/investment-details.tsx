"use client";
import { cva } from "class-variance-authority";
import { useMemo } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import { Currency } from "@/components/currency";
import type { VariantProps } from "class-variance-authority";
import type { Investment, Transaction } from "@/generated/prisma/client";

type InvestmentDetailsProps = {
  investment: Investment;
  transactions: Transaction[];
};

export function InvestmentDetails({
  investment,
  transactions,
}: InvestmentDetailsProps) {
  const balance = useMemo(() => {
    const transactionBalance = transactions.reduce<number>(
      (sum, transaction) =>
        sum +
        transaction.unitValue * transaction.fulfilledQuantity -
        transaction.fee,
      0,
    );

    return transactionBalance - investment.unitValue * investment.quantity;
  }, [investment.quantity, investment.unitValue, transactions]);

  const remainingQuantity = useMemo(() => {
    const fulfilledCount = transactions.reduce<number>(
      (sum, transaction) => sum + transaction.fulfilledQuantity,
      0,
    );
    const remaining = investment.quantity - fulfilledCount;
    return remaining < 0 ? 0 : remaining;
  }, [investment.quantity, transactions]);

  return (
    <Card>
      <CardHeader className="dark:border-input flex items-center justify-between border-b">
        <CardTitle className="text-base select-none">Market ID</CardTitle>
        <CardAction>
          <Value className="bg-muted text-muted-foreground w-fit rounded-sm px-2.5 py-1 font-mono text-xs font-bold">
            {investment.marketId}
          </Value>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-2">
          <Detail>
            <Label>Item</Label>
            <Value>{investment.item}</Value>
          </Detail>
          <Detail>
            <Label>Quantity</Label>
            <Value>{investment.quantity}</Value>
          </Detail>
          <Detail>
            <Label>Remaining Quantity</Label>
            <Value>{remainingQuantity}</Value>
          </Detail>
          <Detail>
            <Label>Unit Value</Label>
            <Value className="flex items-center">
              <Currency value={investment.unitValue} />
            </Value>
          </Detail>
          <Detail>
            <Label>Total Investment</Label>
            <Value className="flex items-center">
              <Currency value={investment.unitValue * investment.quantity} />
            </Value>
          </Detail>
          <Detail>
            <Label>Current Balance</Label>
            <Value
              className={cn(
                balance > 0 && "text-green-600 dark:text-green-500",
                balance < 0 && "text-red-600 dark:text-red-500",
              )}
            >
              <Currency value={balance} />
            </Value>
          </Detail>
        </div>
      </CardContent>
    </Card>
  );
}

const detailVariants = cva("flex", {
  variants: {
    variant: {
      column: "flex-col gap-y-1",
      row: "flex-row gap-x-2 items-center",
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
