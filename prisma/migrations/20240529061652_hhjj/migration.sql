/*
  Warnings:

  - The primary key for the `Trainee` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Trainee" DROP CONSTRAINT "Trainee_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Trainee_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Trainee_id_seq";
