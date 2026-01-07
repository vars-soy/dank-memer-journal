import { EllipsisIcon } from "lucide-react";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/client";
import { InvestmentDetails } from "@/components/investments/investment-details";
import { Button } from "@/components/ui/button";
import { InvestmentActionMenu } from "@/components/investments/investment-action-menu";

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
  const investment = await prisma.investment.findUnique({
    where: { marketId_userId: { marketId, userId: session.user.id } },
  });

  if (!investment) {
    notFound();
  }

  return (
    <div className="container mx-auto flex flex-1 flex-col gap-y-6 py-6">
      <header className="bg-background flex items-center justify-between px-6">
        <h1 className="text-foreground text-3xl font-bold tracking-tight font-stretch-semi-condensed md:text-4xl">
          Investment
        </h1>
        <InvestmentActionMenu investmentId={investment.id} />
      </header>
      <main className="flex flex-1 flex-col px-6">
        <InvestmentDetails investment={investment} />
      </main>
    </div>
  );
}
