-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user',
ALTER COLUMN "status" SET DEFAULT 'active';
