-- CreateEnum
CREATE TYPE "CareType" AS ENUM ('Stationary', 'Ambulatory', 'Both');

-- CreateEnum
CREATE TYPE "Capacity" AS ENUM ('Full', 'Available');

-- CreateTable
CREATE TABLE "Facility" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "zip_code" INTEGER NOT NULL,
    "type_of_care" "CareType" NOT NULL,
    "capacity" "Capacity" NOT NULL,
    "serves_from" INTEGER NOT NULL,
    "serves_to" INTEGER NOT NULL,

    CONSTRAINT "Facility_pkey" PRIMARY KEY ("id")
);
