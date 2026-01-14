"use client";
import { cva } from "class-variance-authority";
import { useActionState } from "react";
import { BoltIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { createInvestment } from "@/lib/actions/investment";
import { mapIssues } from "@/lib/utils/schemas";
import type { VariantProps } from "class-variance-authority";

const investmentFormVariants = cva("cursor-pointer", {
  variants: {
    variant: {
      default: "w-full",
      icon: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function InvestmentFormDialog({
  variant = "default",
}: VariantProps<typeof investmentFormVariants>) {
  const [state, formAction, pending] = useActionState(createInvestment, null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          size={variant === "icon" ? "icon-sm" : "default"}
          variant={variant === "icon" ? "outline" : "default"}
          className={investmentFormVariants({ variant })}
        >
          <PlusIcon />
          {variant === "default" && <span>Add Investment</span>}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Investment</DialogTitle>
          <DialogDescription>
            Add an investment to start traking market transactions
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="new_investment_market_id">
                    Market ID
                  </FieldLabel>
                  <Input
                    id="new_investment_market_id"
                    name="marketId"
                    placeholder="XXXXXX"
                    type="text"
                    className="uppercase"
                    aria-invalid={
                      state?.error?.type === "validation" &&
                      !!state.error.issues?.nested?.marketId?.length
                    }
                    required
                  />
                  <FieldError
                    errors={mapIssues(state?.error?.issues?.nested?.marketId)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="new_investment_item">Item</FieldLabel>
                  <Input
                    id="new_investment_item"
                    name="item"
                    placeholder="Energy Drink"
                    type="text"
                    aria-invalid={
                      state?.error?.type === "validation" &&
                      !!state.error.issues?.nested?.item?.length
                    }
                    required
                  />
                  <FieldError
                    errors={mapIssues(state?.error?.issues?.nested?.item)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="new_investment_quantity">
                    Quantity
                  </FieldLabel>
                  <Input
                    id="new_investment_quantity"
                    name="quantity"
                    placeholder="1"
                    type="number"
                    min={1}
                    step={1}
                    aria-invalid={
                      state?.error?.type === "validation" &&
                      !!state.error.issues?.nested?.quantity?.length
                    }
                    required
                  />
                  <FieldError
                    errors={mapIssues(state?.error?.issues?.nested?.quantity)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="new_investment_unit_value">
                    Unit Value
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupAddon className="pl-3">
                      <BoltIcon className="size-4" />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="new_investment_unit_value"
                      name="unitValue"
                      placeholder="100000"
                      type="number"
                      min={0}
                      step={1}
                      aria-invalid={
                        state?.error?.type === "validation" &&
                        !!state.error.issues?.nested?.unitValue?.length
                      }
                      required
                    />
                  </InputGroup>
                  <FieldError
                    errors={mapIssues(state?.error?.issues?.nested?.unitValue)}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
            <DialogFooter>
              <Field orientation="horizontal">
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={pending}
                >
                  {pending && <Spinner />}
                  Create
                </Button>
              </Field>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
