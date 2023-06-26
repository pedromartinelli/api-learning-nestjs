import { Injectable } from '@nestjs/common';
import { UpdateUserAuthorizationDto } from './dto/update-UserAuthorization.dto';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';

@Injectable()
export class BackOfficeService {
  constructor(private readonly prismaUsersRepository: PrismaUsersRepository) { }

  async findAll() {
    return await this.prismaUsersRepository.findAll()
  }

  async findOne(id: string) {
    return await this.prismaUsersRepository.findById(id)
  }

  async update(id: string, updateUserAuthorizationDto: UpdateUserAuthorizationDto) {
    return await this.prismaUsersRepository.update(id, updateUserAuthorizationDto)
  }
}
