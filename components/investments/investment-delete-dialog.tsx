"use client";
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
import { deleteInvestment } from "@/lib/actions/investment";
import type { Investment } from "@/generated/prisma/client";

type DeleteInvestmentDialogProps = {
  investmentId: Investment["id"];
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
};

export function DeleteInvestmentDialog({
  investmentId,
  isOpen,
  onOpenChange,
}: DeleteInvestmentDialogProps) {
  async function handleAction() {
    await deleteInvestment(investmentId);
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this investment?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            investment and all the data related to it.
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
