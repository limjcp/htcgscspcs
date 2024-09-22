/*
  Warnings:

  - You are about to drop the column `departmentId` on the `ClearanceStep` table. All the data in the column will be lost.
  - You are about to drop the column `departmentId` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `departmentId` on the `Requirement` table. All the data in the column will be lost.
  - You are about to drop the column `departmentId` on the `Signatory` table. All the data in the column will be lost.
  - You are about to drop the column `departmentId` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `schoolYearId` to the `Clearance` table without a default value. This is not possible if the table is not empty.
  - Made the column `officeId` on table `ClearanceStep` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `schoolYear` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolYearId` to the `Requirement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semesterId` to the `Requirement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolYearId` to the `Semester` table without a default value. This is not possible if the table is not empty.
  - Made the column `officeId` on table `Signatory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `officeId` on table `Staff` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "SemesterStatus" AS ENUM ('NULL', 'ONGOING', 'FINISHED');

-- CreateEnum
CREATE TYPE "SchoolYearStatus" AS ENUM ('NULL', 'ONGOING', 'FINISHED');

-- DropForeignKey
ALTER TABLE "ClearanceStep" DROP CONSTRAINT "ClearanceStep_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "ClearanceStep" DROP CONSTRAINT "ClearanceStep_officeId_fkey";

-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Requirement" DROP CONSTRAINT "Requirement_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Signatory" DROP CONSTRAINT "Signatory_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Signatory" DROP CONSTRAINT "Signatory_officeId_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_officeId_fkey";

-- AlterTable
ALTER TABLE "Clearance" ADD COLUMN     "schoolYearId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ClearanceStep" DROP COLUMN "departmentId",
ALTER COLUMN "officeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Program" DROP COLUMN "departmentId";

-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "clearedStudentsList" TEXT[],
ADD COLUMN     "notClearedStudentsList" TEXT[],
ADD COLUMN     "schoolYear" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Requirement" DROP COLUMN "departmentId",
ADD COLUMN     "schoolYearId" TEXT NOT NULL,
ADD COLUMN     "semesterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Semester" ADD COLUMN     "schoolYearId" TEXT NOT NULL,
ADD COLUMN     "status" "SemesterStatus" NOT NULL DEFAULT 'NULL';

-- AlterTable
ALTER TABLE "Signatory" DROP COLUMN "departmentId",
ALTER COLUMN "officeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "departmentId",
ALTER COLUMN "officeId" SET NOT NULL;

-- DropTable
DROP TABLE "Department";

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "SchoolYear" (
    "id" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER NOT NULL,
    "year" TEXT NOT NULL,
    "status" "SchoolYearStatus" NOT NULL DEFAULT 'NULL',

    CONSTRAINT "SchoolYear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OfficeToProgram" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "_OfficeToProgram_AB_unique" ON "_OfficeToProgram"("A", "B");

-- CreateIndex
CREATE INDEX "_OfficeToProgram_B_index" ON "_OfficeToProgram"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "Office"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signatory" ADD CONSTRAINT "Signatory_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "Office"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requirement" ADD CONSTRAINT "Requirement_schoolYearId_fkey" FOREIGN KEY ("schoolYearId") REFERENCES "SchoolYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requirement" ADD CONSTRAINT "Requirement_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Semester" ADD CONSTRAINT "Semester_schoolYearId_fkey" FOREIGN KEY ("schoolYearId") REFERENCES "SchoolYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clearance" ADD CONSTRAINT "Clearance_schoolYearId_fkey" FOREIGN KEY ("schoolYearId") REFERENCES "SchoolYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClearanceStep" ADD CONSTRAINT "ClearanceStep_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "Office"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OfficeToProgram" ADD CONSTRAINT "_OfficeToProgram_A_fkey" FOREIGN KEY ("A") REFERENCES "Office"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OfficeToProgram" ADD CONSTRAINT "_OfficeToProgram_B_fkey" FOREIGN KEY ("B") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
