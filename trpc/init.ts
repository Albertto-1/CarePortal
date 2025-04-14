import { cache } from "react";
import { ZodError } from "zod";
import superjson from "superjson";
import { initTRPC } from "@trpc/server";
import db from "../server/db";

export const createTRPCContext = cache(async () => {
  // INFO: Add elements to context here
  return { db };
});

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const baseProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;
