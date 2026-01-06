import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export const authenticateWithDiscord = async () => {
  const data = await authClient.signIn.social({
    provider: "discord",
  });
  return data;
};
