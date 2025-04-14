import { z } from "zod";
import { CareType, Prisma, PrismaClient } from "@/generated/prisma";
import { baseProcedure, createTRPCRouter } from "./init";
import { getValidFacilities, MAX_ZIP_CODE_DISTANCE } from "./utils";
import { TRPCError } from "@trpc/server";

const getFacilities = (db: PrismaClient, args?: Prisma.FacilityFindManyArgs) =>
  db.facility.findMany(args);

export const appRouter = createTRPCRouter({
  facilities: baseProcedure.query(({ ctx }) => getFacilities(ctx.db)),
  checkAvailability: baseProcedure
    .input(
      z.object({
        name: z.string(),
        typeOfCare: z.nativeEnum(CareType),
        zipCode: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const facilities = await getFacilities(ctx.db, {
        where: {
          type_of_care: {
            has: input.typeOfCare,
          },
          serves_from: {
            lte: input.zipCode,
          },
          serves_to: {
            gte: input.zipCode,
          },
          zip_code: {
            gte: input.zipCode - MAX_ZIP_CODE_DISTANCE,
            lte: input.zipCode + MAX_ZIP_CODE_DISTANCE,
          },
          capacity: {
            equals: "Available",
          },
        },
        orderBy: {
          zip_code: "asc",
        },
      });

      const validFacilities = getValidFacilities(facilities, {
        zipCode: input.zipCode,
      });

      if (validFacilities.length === 0)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "There are no valid facilities",
        });

      return validFacilities;
    }),
});

export type AppRouter = typeof appRouter;
