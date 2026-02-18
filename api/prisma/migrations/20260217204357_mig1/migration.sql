/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Match` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Like" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "createdAt";
