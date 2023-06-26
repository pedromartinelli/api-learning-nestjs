import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/database/prisma.service";
import { Item } from "@prisma/client";

@Injectable()
export class PrismaItemsRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(name: string, description: string, price: number, user_id: string): Promise<void> {
    await this.prisma.item.create({
      data: {
        name,
        description,
        price,
        user: { connect: { id: user_id } }
      }
    })
  }

  async findAllItemsFromUser(user_id: string): Promise<Item[] | null> {
    const items = await this.prisma.item.findMany({
      where: { user_id },
    })
    return items
  }

  async delete(user_id: string, id: string): Promise<void> {
    await this.prisma.item.updateMany({
      where: {
        id,
        user_id
      },
      data: {
        is_active: false
      }
    })
  }
}