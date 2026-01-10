"use client";
import { useCallback } from "react";
import { TransactionForm } from "@/components/transactions/transaction-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Investment, Transaction } from "@/generated/prisma/client";

type TransactionFormDialogProps = {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  investmentId: Investment["id"];
} & (
  | {
      edit?: false;
      transaction?: undefined;
    }
  | {
      edit: true;
      transaction: Transaction;
    }
);

export function TransactionFormDialog({
  isOpen,
  onOpenChange,
  investmentId,
  edit,
  transaction,
}: TransactionFormDialogProps) {
  const handleFormSuccess = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {edit && transaction ? "Edit Transaction" : "New Transaction"}
          </DialogTitle>
          {!edit && !transaction && (
            <DialogDescription>
              Add a market transaction associated to this investment
            </DialogDescription>
          )}
        </DialogHeader>
        <TransactionForm
          investmentId={investmentId}
          onSuccess={handleFormSuccess}
          edit={edit}
          transaction={transaction}
        />
      </DialogContent>
    </Dialog>
  );
}
