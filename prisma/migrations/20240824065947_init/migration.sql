/*
  Warnings:

  - Added the required column `part` to the `audit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "audit" ADD COLUMN     "part" TEXT NOT NULL;
