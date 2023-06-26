ALTER TABLE "orders" ADD COLUMN "new_status" Int;

-- Atualize os valores da nova coluna com base nos valores da coluna existente
UPDATE "orders"
SET "new_status" = CASE
  WHEN "status" = 'em progresso' THEN 0
  WHEN "status" = 'concluído' THEN 1
  WHEN "status" = 'cancelado' THEN 2
  -- Adicione outras condições para mapear todos os valores existentes
END;

-- Remova a coluna existente "status"
ALTER TABLE "orders" DROP COLUMN "status";

-- Renomeie a nova coluna para "status"
ALTER TABLE "orders" RENAME COLUMN "new_status" TO "status";