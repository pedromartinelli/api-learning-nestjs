import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from '@/database/prisma.service';
import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, PrismaOrdersRepository]
})

export class OrdersModule {}
