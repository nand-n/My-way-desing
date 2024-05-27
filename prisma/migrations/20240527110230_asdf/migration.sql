/*
  Warnings:

  - You are about to drop the column `from` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `Message` table. All the data in the column will be lost.
  - Added the required column `email` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "from",
DROP COLUMN "status",
DROP COLUMN "subject",
DROP COLUMN "to",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;
