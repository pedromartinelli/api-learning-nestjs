import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository';
import { User } from '@prisma/client';
// import { OrderWithItem } from "@/repositories/prisma/prisma-orders-repository";

@Injectable()
export class OrdersService {
  constructor(private readonly prismaOrdersRepository: PrismaOrdersRepository) { }

  async create(createOrderDto: CreateOrderDto, user: User) {
    const { status, table, items } = createOrderDto
    const user_id = user.id

    await this.prismaOrdersRepository.create(status, table, user_id, items)
  }

  async findAll(user: User) {
    return await this.prismaOrdersRepository.findAllOrders(user.id);
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
