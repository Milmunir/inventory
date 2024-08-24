/*
  Warnings:

  - You are about to drop the column `item_id` on the `audit` table. All the data in the column will be lost.
  - You are about to drop the column `quantity_after` on the `audit` table. All the data in the column will be lost.
  - You are about to drop the column `quantity_before` on the `audit` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "audit" DROP CONSTRAINT "audit_item_id_fkey";

-- AlterTable
ALTER TABLE "audit" DROP COLUMN "item_id",
DROP COLUMN "quantity_after",
DROP COLUMN "quantity_before",
ADD COLUMN     "after" INTEGER,
ADD COLUMN     "before" INTEGER,
ADD COLUMN     "entity_id" INTEGER,
ADD COLUMN     "type" TEXT;
