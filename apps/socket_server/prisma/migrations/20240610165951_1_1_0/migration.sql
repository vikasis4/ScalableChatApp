/*
  Warnings:

  - You are about to drop the column `tokens` on the `user` table. All the data in the column will be lost.
  - Added the required column `token` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "room" ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "tokens",
ADD COLUMN     "token" TEXT NOT NULL;
