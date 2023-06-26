import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { PrismaService } from '@/database/prisma.service';
import { PrismaItemsRepository } from '@/repositories/prisma/prisma-items-repository';

@Module({
  providers: [ItemsService, PrismaService, PrismaItemsRepository],
  controllers: [ItemsController],
  exports: [ItemsService]
})
export class ItemsModule { }
