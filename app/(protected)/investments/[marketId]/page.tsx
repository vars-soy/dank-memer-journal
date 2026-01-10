import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/client";
import { InvestmentDetails } from "@/components/investments/investment-details";
import { InvestmentActionMenu } from "@/components/investments/investment-action-menu";
import { TransactionList } from "@/components/transactions/transaction-list";

type InvestmentPageProps = {
  params: Promise<{
    marketId: string;
  }>;
};

export default async function InvestmentPage({ params }: InvestmentPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  const { marketId } = await params;
  const result = await prisma.investment.findUnique({
    where: { marketId_userId: { marketId, userId: session.user.id } },
    include: {
      transactions: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!result) {
    notFound();
  }

  const { transactions, ...investment } = result;

  return (
    <div className="container mx-auto flex flex-1 flex-col gap-y-6 py-6">
      <header className="bg-background flex items-center justify-between px-6">
        <h1 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
          Investment
        </h1>
        <InvestmentActionMenu investmentId={investment.id} />
      </header>
      <main className="flex flex-1 flex-col gap-y-6 px-6">
        <InvestmentDetails
          investment={investment}
          transactions={transactions}
        />
        <div className="flex flex-col gap-y-4">
          <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
            Market Transactions
          </h2>
          <TransactionList transactions={transactions} />
        </div>
      </main>
    </div>
  );
}
