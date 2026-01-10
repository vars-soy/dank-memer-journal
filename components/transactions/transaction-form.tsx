import { BoltIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Spinner } from "@/components/ui/spinner";
import { createTransaction, editTransaction } from "@/lib/actions/transaction";
import { TRANSACTION_STATUS } from "@/lib/db/enums";
import { mapIssues } from "@/lib/utils/schemas";
import type { Investment, Transaction } from "@/generated/prisma/client";

type TransactionFormProps = {
  investmentId: Investment["id"];
  onSuccess?: () => void;
  edit?: boolean;
  transaction?: Transaction;
};

export function TransactionForm({
  investmentId,
  onSuccess,
  edit,
  transaction,
}: TransactionFormProps) {
  const pathname = usePathname();
  const actionWithIDs =
    edit && transaction
      ? editTransaction.bind(null, transaction.id, pathname)
      : createTransaction.bind(null, investmentId, pathname);

  const [state, formAction, pending] = useActionState(actionWithIDs, null);

  useEffect(() => {
    if (onSuccess && state?.success) {
      onSuccess();
    }
  }, [onSuccess, state?.success]);

  return (
    <form action={formAction}>
      <FieldGroup>
        <FieldGroup className="max-h-[45dvh] overflow-y-auto md:max-h-none">
          <Field className="p-0.75">
            <FieldLabel htmlFor="new_transaction_market_id">
              Market ID
            </FieldLabel>
            <Input
              id="new_transaction_market_id"
              name="marketId"
              placeholder="XXXXXX"
              type="text"
              defaultValue={
                edit && transaction ? transaction.marketId : undefined
              }
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
          <FieldSet>
            <FieldLegend>Item</FieldLegend>
            <FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                <Field className="p-0.75">
                  <FieldLabel htmlFor="new_transaction_quantity">
                    Quantity
                  </FieldLabel>
                  <Input
                    id="new_transaction_quantity"
                    name="quantity"
                    placeholder="1"
                    type="number"
                    inputMode="numeric"
                    defaultValue={
                      edit && transaction ? transaction.quantity : undefined
                    }
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
                <Field className="p-0.75">
                  <FieldLabel htmlFor="new_transaction_fulfilled_quantity">
                    Fulfilled
                  </FieldLabel>
                  <Input
                    id="new_transaction_fulfilled_quantity"
                    name="fulfilledQuantity"
                    placeholder="0"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    step={1}
                    defaultValue={
                      edit && transaction ? transaction.fulfilledQuantity : 0
                    }
                    aria-invalid={
                      state?.error?.type === "validation" &&
                      !!state.error.issues?.nested?.fulfilledQuantity?.length
                    }
                    required
                  />
                  <FieldError
                    errors={mapIssues(
                      state?.error?.issues?.nested?.fulfilledQuantity,
                    )}
                  />
                </Field>
              </div>
              <Field className="p-0.75">
                <FieldLabel htmlFor="new_transaction_unit_value">
                  Unit Value
                </FieldLabel>
                <InputGroup>
                  <InputGroupAddon className="pl-3">
                    <BoltIcon className="size-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="new_transaction_unit_value"
                    name="unitValue"
                    placeholder="100000"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    step={1}
                    defaultValue={
                      edit && transaction ? transaction.unitValue : undefined
                    }
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
          <FieldSet>
            <FieldLegend>Offer</FieldLegend>
            <FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                <Field className="p-0.75">
                  <FieldLabel htmlFor="new_transaction_days">Days</FieldLabel>
                  <Input
                    id="new_transaction_days"
                    name="days"
                    placeholder="1"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    step={1}
                    defaultValue={
                      edit && transaction ? transaction.days : undefined
                    }
                    aria-invalid={
                      state?.error?.type === "validation" &&
                      !!state.error.issues?.nested?.days?.length
                    }
                    required
                  />
                  <FieldError
                    errors={mapIssues(state?.error?.issues?.nested?.days)}
                  />
                </Field>
                <Field className="p-0.75">
                  <FieldLabel htmlFor="new_transaction_status">
                    Status
                  </FieldLabel>
                  <NativeSelect
                    defaultValue={
                      edit && transaction
                        ? transaction.status
                        : TRANSACTION_STATUS.ACTIVE
                    }
                    id="new_transaction_status"
                    name="status"
                    className="cursor-pointer"
                    aria-invalid={
                      state?.error?.type === "validation" &&
                      !!state.error.issues?.nested?.status?.length
                    }
                  >
                    <NativeSelectOption value={TRANSACTION_STATUS.ACTIVE}>
                      Active
                    </NativeSelectOption>
                    <NativeSelectOption value={TRANSACTION_STATUS.EXPIRED}>
                      Expired
                    </NativeSelectOption>
                    <NativeSelectOption value={TRANSACTION_STATUS.FULFILLED}>
                      Fulfilled
                    </NativeSelectOption>
                    <NativeSelectOption value={TRANSACTION_STATUS.REMOVED}>
                      Removed
                    </NativeSelectOption>
                  </NativeSelect>
                  <FieldError
                    errors={mapIssues(state?.error?.issues?.nested?.status)}
                  />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
        <Field orientation="horizontal">
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={pending}
          >
            {pending && <Spinner />}
            {edit && transaction ? "Apply" : "Create"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
