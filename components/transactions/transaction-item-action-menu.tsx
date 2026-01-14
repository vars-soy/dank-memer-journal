"use client";
import { EllipsisIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Transaction } from "@/generated/prisma/client";
import { deleteTransaction } from "@/lib/actions/transaction";
import { TransactionFormDialog } from "./transaction-form-dialog";
import { DeleteTransactionDialog } from "./transaction-delete-dialog";

type TransactionItemActionMenuProps = {
  transaction: Transaction;
};

export function TransactionItemActionMenu({
  transaction,
}: TransactionItemActionMenuProps) {
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  function handleEdit() {
    setIsTransactionDialogOpen(true);
  }

  function handleDelete() {
    setIsDeleteDialogOpen(true);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            className="size-6 cursor-pointer rounded-sm"
          >
            <EllipsisIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{transaction.marketId}</DropdownMenuLabel>
          <DropdownMenuItem onSelect={handleEdit} className="cursor-pointer">
            <PencilIcon />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={handleDelete}
            className="cursor-pointer"
          >
            <Trash2Icon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <TransactionFormDialog
        isOpen={isTransactionDialogOpen}
        onOpenChange={setIsTransactionDialogOpen}
        investmentId={transaction.investmentId}
        transaction={transaction}
        edit
      />
      <DeleteTransactionDialog
        transactionId={transaction.id}
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </>
  );
}
