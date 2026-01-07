"use client";

import { Button } from "@/components/ui/button";
import { DiscordSymbol } from "./svg/discord-symbol";
import { authenticateWithDiscord } from "@/lib/auth-client";

export function DiscordAuthButton() {
  return (
    <Button
      type="button"
      className="w-full cursor-pointer bg-[#5865f2] text-sm font-semibold text-white hover:bg-[#5865f2]/90"
      onClick={authenticateWithDiscord}
    >
      <DiscordSymbol />
      <span>Continue with Discord</span>
    </Button>
  );
}
