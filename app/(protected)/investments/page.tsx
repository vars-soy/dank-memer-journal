import { headers } from "next/headers";
import { InvestmentList } from "@/components/investments/investment-list";
import { auth } from "@/lib/auth";
import { getInvestmentCount } from "@/lib/db/api/investments";
import { InvestmentForm } from "@/components/investments/investment-form";

export default async function InvestmentsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  const investmentCount = await getInvestmentCount(session.user.id);

  return (
    <div className="container mx-auto flex flex-1 flex-col gap-y-6 py-6">
      <header className="bg-background flex items-center justify-between px-6">
        <h1 className="text-foreground text-3xl font-bold tracking-tight font-stretch-semi-condensed md:text-4xl">
          Investments
        </h1>
        {!!investmentCount && <InvestmentForm variant="icon" />}
      </header>
      <main className="flex flex-1 flex-col items-center px-6">
        <InvestmentList />
      </main>
    </div>
  );
}
