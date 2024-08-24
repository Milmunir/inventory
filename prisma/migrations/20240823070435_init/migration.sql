/*
  Warnings:

  - Made the column `type` on table `audit` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "audit" ALTER COLUMN "type" SET NOT NULL;

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "alertqty" INTEGER NOT NULL DEFAULT 1000;
