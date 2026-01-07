import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UserMenu } from "@/components/user-menu";
import { auth } from "@/lib/auth";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-1 flex-col">
      {session && (
        <nav className="bg-background dark:border-input sticky top-0 z-10 flex items-center justify-between border-b px-6 py-3">
          <p className="text-foreground text-base font-semibold tracking-tight">
            Dank Memer Journal
          </p>
          <UserMenu />
        </nav>
      )}
      {children}
    </div>
  );
}
