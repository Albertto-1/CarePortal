import { createCallerFactory, createTRPCContext } from "./init";
import { appRouter } from "./router";

const createCaller = createCallerFactory(appRouter);
export const caller = createCaller(createTRPCContext);
