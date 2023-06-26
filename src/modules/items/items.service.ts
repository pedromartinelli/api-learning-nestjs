import { CreateItemDto } from '@/dto/items/create-items.dto';
import { PrismaItemsRepository } from '@/repositories/prisma/prisma-items-repository';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaItemsRepository: PrismaItemsRepository) { }

  async create(itemData: CreateItemDto, user: User) {
    const { name, description, price } = itemData
    const user_id = user.id

    await this.prismaItemsRepository.create(name, description, price, user_id)
  }

  async index(user_id: string) {
    return await this.prismaItemsRepository.findAllItemsFromUser(user_id)
  }

  async delete(user_id: string, id: string) {
    return await this.prismaItemsRepository.delete(user_id, id)
  } 

  // async index() {
  // }

  // async update(id: string) {
  // }

}
