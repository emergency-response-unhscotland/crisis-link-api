/*
  Warnings:

  - Made the column `location` on table `Crisis` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Crisis" ALTER COLUMN "location" SET NOT NULL;
