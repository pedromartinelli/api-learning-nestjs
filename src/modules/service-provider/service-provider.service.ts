import { Injectable } from '@nestjs/common';
import { CreateServiceProviderDto } from './dto/create-service-provider.dto';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';
import { User } from '@prisma/client';
import { PrismaServiceProviderRepository } from '@/repositories/prisma/prisma-serviceProvider-repository';

@Injectable()
export class ServiceProviderService {
  constructor(private readonly prismaServiceProviderRepository: PrismaServiceProviderRepository) { }


  async registerServiceProvider(userData: CreateServiceProviderDto, user: User, ) {
    const { description, CPF, address, CEP, birth_date } = userData
    const user_id = user.id

    await this.prismaServiceProviderRepository.createServiceProvider(description, CPF, address, CEP, birth_date, user_id)
  }

  findAll() {
    return `This action returns all serviceProvider`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceProvider`;
  }

  update(id: number, updateServiceProviderDto: UpdateServiceProviderDto) {
    return `This action updates a #${id} serviceProvider`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceProvider`;
  }
}
