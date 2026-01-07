import { headers } from "next/headers";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { getAllInvestmentsByUserId } from "@/lib/db/api/investments";
import { InvestmentForm } from "./investment-form";
import { InvestmentItem } from "./investment-item";

export async function InvestmentList() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  const investments = await getAllInvestmentsByUserId(session.user.id);

  if (!investments.length) {
    return (
      <div className="flex flex-1 flex-col justify-center">
        <EmptyList />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-y-4">
      {investments.map((investment) => (
        <InvestmentItem
          key={investment.id}
          item={investment.item}
          marketId={investment.marketId}
          quantity={investment.quantity}
          unitValue={investment.unitValue}
        />
      ))}
    </div>
  );
}

function EmptyList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>You have no investments yet</CardTitle>
        <CardDescription>
          Investements are the starting point for tracking market transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Start by adding your first investment</p>
      </CardContent>
      <CardFooter>
        <InvestmentForm />
      </CardFooter>
    </Card>
  );
}
