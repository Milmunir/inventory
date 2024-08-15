/*
  Warnings:

  - You are about to drop the `img_test` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `imgpath` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" ADD COLUMN     "imgpath" TEXT NOT NULL;

-- DropTable
DROP TABLE "img_test";
