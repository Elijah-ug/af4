/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `Message` table. All the data in the column will be lost.
  - Added the required column `adminId` to the `Update` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "isDeleted",
ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "receiverDeletedAt" TIMESTAMP(3),
ADD COLUMN     "senderDeletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Update" ADD COLUMN     "adminId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Update" ADD CONSTRAINT "Update_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
