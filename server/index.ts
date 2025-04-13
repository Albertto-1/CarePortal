import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "./trpc";
import { CareType } from "@/generated/prisma";

const getFacilities = () =>
  publicProcedure.query(({ ctx }) => ctx.db.facility.findMany());

export const appRouter = createTRPCRouter({
  facilities: getFacilities(),
  checkAvailability: publicProcedure
    .input(
      z.object({
        name: z.string(),
        typeOfCare: z.nativeEnum(CareType),
        zipCode: z.number(),
      }),
    )
    .mutation(({ input }) => {
      const facilities = getFacilities();
      console.log(input);
      console.log(facilities);

      return true;
    }),
});
export type AppRouter = typeof appRouter;
