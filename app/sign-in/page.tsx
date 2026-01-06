import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DiscordAuthButton } from "@/components/discord-auth-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return (
    <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-6 md:px-0">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Dank Memer Journal!</CardTitle>
          <CardDescription>
            A journal to keep track of personal transactions within Dank Memer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-sans">To use the journal you need to sign in</p>
        </CardContent>
        <CardFooter>
          <DiscordAuthButton />
        </CardFooter>
      </Card>
    </div>
  );
}
