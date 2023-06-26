import { hash } from 'bcrypt'
import { MessagesHelper } from '@/helpers/messages.helper'
import { CreateUserDto } from '@/dto/users/create-user.dto'
import { UpdateUserDto } from '@/dto/users/update-user.dto'
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

@Injectable()
export class UsersService{
  constructor(private readonly prismaUsersRepository: PrismaUsersRepository) {}
  
  async create(userData: CreateUserDto) {
    const { first_name, last_name, email, password  } = userData
    
    const existingUser = await this.prismaUsersRepository.findByEmail(email)
    
    if (existingUser) {
      throw new HttpException(MessagesHelper.USER_ALREADY_EXIST, HttpStatus.CONFLICT)
    }

    const hashedPassword = await hash(password, 8)

    await this.prismaUsersRepository.create(first_name, last_name, email, hashedPassword)
  }

  async index() {
    return await this.prismaUsersRepository.findAll()
  }

  async update(id: string, userData: UpdateUserDto) { 
    await this.prismaUsersRepository.update(id, userData)
  }

  async show(id: string) {
    return await this.prismaUsersRepository.findById(id)
  }
}
