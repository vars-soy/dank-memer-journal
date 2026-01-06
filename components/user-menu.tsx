"use client";

import { LogOutIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";

export function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <Avatar>
        <AvatarFallback>
          <Spinner />
        </AvatarFallback>
      </Avatar>
    );
  }

  if (!session) {
    return null;
  }

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="cursor-pointer rounded-full bg-transparent outline-0"
        >
          <Avatar>
            {session?.user?.image && (
              <AvatarImage src={session.user.image} alt={session.user.name} />
            )}
            <AvatarFallback>
              <UserIcon className="size-4" />
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
        <DropdownMenuItem onSelect={handleSignOut} className="cursor-pointer">
          <LogOutIcon />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
