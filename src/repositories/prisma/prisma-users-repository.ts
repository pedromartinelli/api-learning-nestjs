import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "@/database/prisma.service";
import { UsersRepository } from "../users-repository";
import { Prisma, User } from "@prisma/client";
import { MessagesHelper } from "@/helpers/messages.helper";

@Injectable()
export class PrismaUsersRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(first_name: string, last_name: string, email: string, password: string): Promise<void> {
    try {
      await this.prisma.user.create({
        data: {
          first_name,
          last_name,
          email,
          password
        }
      })
    } catch (error) {
      throw new HttpException(MessagesHelper.DATABASE, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email
        },
      });
      return user;
      
    } catch (error) {
      throw new HttpException(MessagesHelper.DATABASE, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findByResetToken(reset_token: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        reset_token
      } as Prisma.UserWhereUniqueInput
    });

    return user;
  }

  // async findById(id: string): Promise<Pick<User, 'first_name' | 'last_name' | 'email'> | null[]> {
  //   return await this.prisma.user.findUnique(
  //     {
  //       where: { id },
  //       select: {
  //         first_name: true,
  //         last_name: true,
  //         email: true
  //       }
  //     });
  // }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    })

    delete user.password
    delete user.updated_at

    return user
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

  async updateResetToken(user_id: string, reset_token: string, reset_token_expiry: Date): Promise<void> {
    try {
      await this.prisma.user.update({
        where: { id: user_id },
        data: {
          reset_token,
          reset_token_expiry,
        }
      });
    } catch (error) {
      throw new Error('Failed to update reset token.');
    }
  }

  async clearResetToken(user_id: string): Promise<void> {
    try {
      await this.prisma.user.update({
        where: { id: user_id },
        data: {
          reset_token: null,
          reset_token_expiry: null
        }
      })
    } catch (error) {
      throw new Error('Failed to clear reset token.');
    }
  }

  async updatePassword(id: string, password: string): Promise<void> {
    try {
      await this.prisma.user.update({
        where: { id },
        data: {
          password: { set: password }
        },
      });
    } catch (error) {
      throw new Error('Failed to update password.');
    }
  }
}