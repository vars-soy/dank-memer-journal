import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { UserMenu } from "@/components/user-menu";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-1 flex-col">
      {session && (
        <nav className="flex items-center justify-end px-6 py-3">
          <UserMenu />
        </nav>
      )}
      <h1>Hello World!</h1>
    </div>
  );
}
