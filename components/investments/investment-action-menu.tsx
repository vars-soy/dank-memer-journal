"use client";
import { useState } from "react";
import { EllipsisIcon, ReceiptTextIcon, Trash2Icon } from "lucide-react";
import { TransactionFormDialog } from "@/components/transactions/transaction-form-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Investment } from "@/generated/prisma/client";
import { DeleteInvestmentDialog } from "./investment-delete-dialog";

type InvestmentActionMenuProps = {
  investmentId: Investment["id"];
};

export function InvestmentActionMenu({
  investmentId,
}: InvestmentActionMenuProps) {
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  function handleAddTransaction() {
    setIsTransactionDialogOpen(true);
  }

  function handleDelete() {
    setIsDeleteDialogOpen(true);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon-sm" className="cursor-pointer">
            <EllipsisIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onSelect={handleAddTransaction}
            className="cursor-pointer"
          >
            <ReceiptTextIcon />
            <span>Add Transaction</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={handleDelete}
            className="cursor-pointer"
          >
            <Trash2Icon />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <TransactionFormDialog
        investmentId={investmentId}
        isOpen={isTransactionDialogOpen}
        onOpenChange={setIsTransactionDialogOpen}
      />
      <DeleteInvestmentDialog
        investmentId={investmentId}
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </>
  );
}
