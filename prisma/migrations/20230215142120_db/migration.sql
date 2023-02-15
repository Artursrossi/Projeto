/*
  Warnings:

  - A unique constraint covering the columns `[icon]` on the table `Produtos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pass]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Produtos_icon_key" ON "Produtos"("icon");

-- CreateIndex
CREATE UNIQUE INDEX "User_pass_key" ON "User"("pass");
