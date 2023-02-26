/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `ServiceRequest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ServiceRequest" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ServiceRequest_slug_key" ON "ServiceRequest"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_slug_key" ON "User"("slug");
