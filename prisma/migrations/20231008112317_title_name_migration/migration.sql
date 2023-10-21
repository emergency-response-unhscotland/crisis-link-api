/*
  Warnings:

  - You are about to drop the column `title` on the `Crisis` table. All the data in the column will be lost.
  - Added the required column `name` to the `Crisis` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "Crisis" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;
