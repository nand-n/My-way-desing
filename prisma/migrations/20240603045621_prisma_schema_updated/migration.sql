/*
  Warnings:

  - Added the required column `priority` to the `NeededItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "NeededItem" ADD COLUMN     "priority" "Priority" NOT NULL;
