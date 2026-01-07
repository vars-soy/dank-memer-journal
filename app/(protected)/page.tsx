import Link from "next/link";
import { BoltIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function IndexPage() {
  return (
    <main className="container mx-auto flex flex-1 flex-col items-center justify-center">
      <Button variant="outline" asChild>
        <Link href="/investments">
          <BoltIcon />
          <span>Investments</span>
        </Link>
      </Button>
    </main>
  );
}
