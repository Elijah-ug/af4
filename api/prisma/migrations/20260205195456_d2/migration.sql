/*
  Warnings:

  - A unique constraint covering the columns `[userId,friendId]` on the table `Penpal` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Message_penpalId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Penpal_userId_friendId_key" ON "Penpal"("userId", "friendId");
