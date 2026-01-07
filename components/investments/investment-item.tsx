import Link from "next/link";
import { ArrowRightIcon, BoltIcon, CirclePileIcon } from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { numberFormatter } from "@/lib/utils/number";
import type { LucideIcon } from "lucide-react";
import type { Investment } from "@/generated/prisma/client";

export type InvestmentItemProps = Pick<
  Investment,
  "item" | "marketId" | "quantity" | "unitValue"
>;

export function InvestmentItem({
  item,
  marketId,
  quantity,
  unitValue,
}: InvestmentItemProps) {
  return (
    <Item variant="outline" asChild>
      <Link href={`/investments/${marketId}`}>
        <ItemMedia>
          <p className="bg-muted text-muted-foreground rounded-sm px-2.5 py-1 font-mono text-xs">
            {marketId}
          </p>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{item}</ItemTitle>
          <ItemDescription className="flex items-center gap-x-2">
            <InvestmentProperty Icon={CirclePileIcon} value={quantity} />
            <InvestmentProperty
              Icon={BoltIcon}
              value={numberFormatter.format(unitValue * quantity)}
            />
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <ArrowRightIcon className="size-5" />
        </ItemActions>
      </Link>
    </Item>
  );
}

type InvestmentPropertyProps = {
  Icon: LucideIcon;
  value: string | number;
};

function InvestmentProperty({ Icon, value }: InvestmentPropertyProps) {
  return (
    <span className="inline-flex items-center gap-x-0.5">
      <Icon className="text-muted-foreground size-3" />
      <span className="text-muted-foreground text-sm">{value}</span>
    </span>
  );
}
