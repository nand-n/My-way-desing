/*
  Warnings:

  - The `phone` column on the `Trainee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `accountNumber` column on the `Trainee` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Trainee" DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER,
DROP COLUMN "accountNumber",
ADD COLUMN     "accountNumber" INTEGER;
