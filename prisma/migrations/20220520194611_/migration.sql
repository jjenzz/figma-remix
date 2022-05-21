-- CreateEnum
CREATE TYPE "ShapeType" AS ENUM ('RECT', 'CIRCLE');

-- CreateTable
CREATE TABLE "Shape" (
    "id" SERIAL NOT NULL,
    "type" "ShapeType" NOT NULL,
    "background_color" TEXT,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "x" INTEGER,
    "y" INTEGER,

    CONSTRAINT "Shape_pkey" PRIMARY KEY ("id")
);
