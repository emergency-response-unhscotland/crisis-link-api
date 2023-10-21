/*
  Warnings:

  - You are about to drop the column `link` on the `Crisis` table. All the data in the column will be lost.
  - Added the required column `severity` to the `Crisis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Crisis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Crisis" DROP COLUMN "link",
ADD COLUMN     "location" TEXT,
ADD COLUMN     "severity" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
