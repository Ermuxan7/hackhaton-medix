/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'DONE');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ADMIN';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
ALTER COLUMN "role" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "doctorId" INTEGER NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabRequest" (
    "id" SERIAL NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "result" TEXT,
    "patientId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,

    CONSTRAINT "LabRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabRequest" ADD CONSTRAINT "LabRequest_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabRequest" ADD CONSTRAINT "LabRequest_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
