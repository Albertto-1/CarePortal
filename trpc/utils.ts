import { Facility } from "@/generated/prisma";

export const MAX_ZIP_CODE_DISTANCE = 3000;

export const getValidFacilities = (
  facilities: Facility[],
  {
    zipCode,
  }: {
    zipCode: number;
  },
): Facility[] => {
  return facilities
    .map((facility) => ({
      ...facility,
      zipDistance: Math.abs(facility.zip_code - zipCode),
    }))
    .sort((a, b) => a.zipDistance - b.zipDistance);
};
