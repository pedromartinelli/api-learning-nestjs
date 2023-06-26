-- AlterTable
ALTER TABLE "items" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 0;
