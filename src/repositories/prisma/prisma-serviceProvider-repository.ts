import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "@/database/prisma.service";
import { UsersRepository } from "../users-repository";
import { Prisma, User } from "@prisma/client";
import { MessagesHelper } from "@/helpers/messages.helper";

@Injectable()
export class PrismaServiceProviderRepository {
  constructor(private readonly prisma: PrismaService) { }

  // async getServiceProviderByUserId(user_id: string) {
  //   return this.prisma.serviceProvider.findUnique({
  //     where: {
  //       user_id: userId,
  //     },
  //   });
  // }

  async createServiceProvider(description: string, CPF: string, address: string, CEP: string, birth_date: Date, user_id: string) {
    const serviceProvider = await this.prisma.serviceProvider.create({
      data: {
        description,
        CPF,
        address,
        CEP,
        birth_date,
        user: { connect: { id: user_id } },
      }
    });

    await this.prisma.user.update({
      where: { id: user_id },
      data: { role: 'SERVICE_PROVIDER' },
    });

    return serviceProvider
  }
}