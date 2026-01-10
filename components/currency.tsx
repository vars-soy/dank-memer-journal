import { cn } from "@/lib/utils/cn";
import { numberFormatter } from "@/lib/utils/number";
import { BoltIcon } from "lucide-react";
import { ComponentProps } from "react";

type CurrencyProps = Pick<ComponentProps<"span">, "className"> & {
  value: number;
  iconClassName?: ComponentProps<"svg">["className"];
};

export function Currency({ value, className, iconClassName }: CurrencyProps) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      {value < 0 && "-"}
      <span>
        <BoltIcon
          className={cn("size-[round(calc(1em-0.14em),1px)]", iconClassName)}
        />
      </span>
      <span>{numberFormatter.format(Math.abs(value))}</span>
    </span>
  );
}
