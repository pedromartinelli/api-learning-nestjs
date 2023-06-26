import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/database/prisma.service";
import { Item, Order } from "@prisma/client";

// export interface OrderWithItem extends Order {
//   item_name: string;
//   item_total_price: number;
// }

@Injectable()
export class PrismaOrdersRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(status: number, table: string, user_id: string, items: { item_id: string, quantity: number }[]): Promise<void> {
    const userItems = await this.prisma.item.findMany({
      where: {
        user_id: user_id
      }
    })

    const totalPrice = userItems.reduce((acc, item) => {
      const foundItem = items.find(i => i.item_id === item.id);
      if (foundItem) {
        return acc + (item.price * foundItem.quantity);
      }
      return acc;
    }, 0);

    await this.prisma.order.create({
      data: {
        status,
        total_price: totalPrice,
        table,
        user: { connect: { id: user_id } },
        OrderItem: {
          create: items.map(({ item_id, quantity }) => ({
            quantity,
            item: { connect: { id: item_id } },
          })),
        },
      },
    });
  }

  // async findAllOrders(user_id: string): Promise<Order[] | null> {
  //   const orders = await this.prisma.order.findMany({
  //     where: { user_id }
  //   })
  //   return orders
  // }

  async findAllOrders(user_id: string): Promise<Order[] | null> {
    const orders = await this.prisma.order.findMany({
      where: { user_id },
      include: {
        OrderItem: {
          include: {
            item: true,
          },
        },
      },
    });

    if (!orders) return null;

    // const formattedOrders = orders.map((order) => {
    //   const formattedItems = order.OrderItem.map((orderItem) => {
    //     return {
    //       name: orderItem.item.name,
    //       price: orderItem.item.price,
    //       quantity: orderItem.quantity,
    //     };
    //   });

    //   return {
    //     id: order.id,
    //     status: order.status,
    //     total_price: order.total_price,
    //     table: order.table,
    //     user_id: order.user_id,
    //     created_at: order.created_at,
    //     updated_at: order.updated_at,
    //     items: formattedItems,
    //   };
    // });

    // return formattedOrders;

    return Object.values(orders);
    return { ...orders };
  }
}