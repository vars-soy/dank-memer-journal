"use client";

import {
  CheckIcon,
  LogOutIcon,
  MoonIcon,
  SunIcon,
  SunMoonIcon,
  UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "./ui/skeleton";

export function UserMenu() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Skeleton className="size-8 rounded-full" />;
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

  function handleThemeSelection(mode: "light" | "dark" | "system") {
    return () => {
      setTheme(mode);
    };
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
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            {theme === "dark" && <MoonIcon />}
            {theme === "light" && <SunIcon />}
            {theme === "system" && <SunMoonIcon />}
            <span>Select Theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem
              onSelect={handleThemeSelection("light")}
              className="cursor-pointer"
            >
              <SunIcon />
              <span>Light</span>
              {theme === "light" && <CheckIcon className="ml-auto" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={handleThemeSelection("dark")}
              className="cursor-pointer"
            >
              <MoonIcon />
              <span>Dark</span>
              {theme === "dark" && <CheckIcon className="ml-auto" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={handleThemeSelection("system")}
              className="cursor-pointer"
            >
              <SunMoonIcon />
              <span>System</span>
              {theme === "system" && <CheckIcon className="ml-auto" />}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleSignOut} className="cursor-pointer">
          <LogOutIcon />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
