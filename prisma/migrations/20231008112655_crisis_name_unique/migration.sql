/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Crisis` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Crisis_name_key" ON "Crisis"("name");
