/*
  Warnings:

  - You are about to drop the column `email` on the `UserQueries` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `UserQueries` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserQueries" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
