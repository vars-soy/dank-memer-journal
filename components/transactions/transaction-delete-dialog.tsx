"use client";
import { usePathname } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteTransaction } from "@/lib/actions/transaction";
import type { Transaction } from "@/generated/prisma/client";

type DeleteTransactionDialogProps = {
  transactionId: Transaction["id"];
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
};

export function DeleteTransactionDialog({
  transactionId,
  isOpen,
  onOpenChange,
}: DeleteTransactionDialogProps) {
  const pathname = usePathname();

  async function handleAction() {
    await deleteTransaction(transactionId, pathname);
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this transaction?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            transaction and all the data related to it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer"
            variant="destructive"
            onClick={handleAction}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
