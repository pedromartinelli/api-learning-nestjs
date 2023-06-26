import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/database/prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class PrismaUsersRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findById(id: string): Promise<Pick<User, 'first_name' | 'last_name' | 'email'> | null[]> {
    const user = await this.prisma.user.findUnique(
      {
        where: { id },
        select: {
          first_name: true,
          last_name: true,
          email: true
        }
      },
    );
    return user;
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: userData,
      });

      return updatedUser;
    } catch (error) {
      throw new Error("Failed to update user.");
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany()
    return users
  }

  // async findAll(): Promise<Pick<User, 'first_name' | 'last_name' | 'email'>[]> {
  //   const users = await this.prisma.user.findMany({
  //     select: {
  //       first_name: true,
  //       last_name: true,
  //       email: true,
  //     },
  //   });
  //   return users;
  // }
}