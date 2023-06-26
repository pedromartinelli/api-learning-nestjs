import { Module } from '@nestjs/common';
import { BackOfficeService } from './back-office.service';
import { BackOfficeController } from './back-office.controller';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { PrismaService } from '@/database/prisma.service';

@Module({
  providers: [BackOfficeService, PrismaUsersRepository, PrismaService],
  controllers: [BackOfficeController]
})
export class BackOfficeModule {}
