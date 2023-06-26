import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '@/database/prisma.service';
import { UsersController } from './users.controller';
// import { UsersRepository } from '@/repositories/users-repository';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';


@Module({
  providers: [UsersService, PrismaService, PrismaUsersRepository,
    // {
    //   provide: UsersRepository,
    //   useClass: PrismaUsersRepository
    // },
  ],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule { }