-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pass" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produtos" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "Produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Links" (
    "id" SERIAL NOT NULL,
    "userEmail" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "productsIDs" TEXT NOT NULL,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_pass_key" ON "User"("pass");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Produtos_icon_key" ON "Produtos"("icon");

-- CreateIndex
CREATE UNIQUE INDEX "Links_userEmail_key" ON "Links"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Links_link_key" ON "Links"("link");

-- CreateIndex
CREATE UNIQUE INDEX "Links_productsIDs_key" ON "Links"("productsIDs");
