import "server-only";

import { cache } from "react";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import createQueryClient from "./query-client";
import { createTRPCContext } from "./init";
import { appRouter } from "./router";

export const getQueryClient = cache(createQueryClient);

export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});
