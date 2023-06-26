import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { PrismaService } from '@/database/prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: {  expiresIn: '1d'}
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, PrismaUsersRepository, PrismaService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
