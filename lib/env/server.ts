import { createEnv } from "@t3-oss/env-nextjs";
import * as v from "valibot";

export const env = createEnv({
  server: {
    BETTER_AUTH_SECRET: v.pipe(v.string(), v.nonEmpty()),
    BETTER_AUTH_URL: v.pipe(v.string(), v.url()),
    DATABASE_URL: v.pipe(v.string(), v.url()),
    DISCORD_CLIENT_ID: v.pipe(v.string(), v.nonEmpty()),
    DISCORD_CLIENT_SECRET: v.pipe(v.string(), v.nonEmpty()),
  },
  experimental__runtimeEnv: process.env,
});
