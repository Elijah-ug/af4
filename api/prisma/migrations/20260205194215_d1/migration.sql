/*
  Warnings:

  - A unique constraint covering the columns `[penpalId]` on the table `Message` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `penpalId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "penpalId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "likes" INTEGER;

-- AlterTable
ALTER TABLE "UserPic" ADD COLUMN     "likes" INTEGER;

-- AlterTable
ALTER TABLE "UserPost" ADD COLUMN     "likes" INTEGER;

-- CreateTable
CREATE TABLE "Penpal" (
    "id" SERIAL NOT NULL,
    "friendId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Penpal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Penpal_friendId_key" ON "Penpal"("friendId");

-- CreateIndex
CREATE UNIQUE INDEX "Message_penpalId_key" ON "Message"("penpalId");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_penpalId_fkey" FOREIGN KEY ("penpalId") REFERENCES "Penpal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penpal" ADD CONSTRAINT "Penpal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penpal" ADD CONSTRAINT "Penpal_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
