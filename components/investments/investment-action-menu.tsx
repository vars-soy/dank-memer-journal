"use client";
import { EllipsisIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Investment } from "@/generated/prisma/client";

type InvestmentActionMenuProps = {
  investmentId: Investment["id"];
};

export function InvestmentActionMenu({
  investmentId,
}: InvestmentActionMenuProps) {
  function handleDelete() {
    // [TODO] Add implementation
    console.log(`Remove ID: "${investmentId}"`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon-sm" className="cursor-pointer">
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
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
  );
}
