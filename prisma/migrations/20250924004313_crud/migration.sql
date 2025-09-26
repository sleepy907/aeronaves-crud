-- CreateTable
CREATE TABLE "Aeronave" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modelo" TEXT NOT NULL,
    "fabricante" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "capacidade" INTEGER NOT NULL
);
