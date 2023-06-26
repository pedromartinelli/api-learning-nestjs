import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { compareSync, hash, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'node:crypto';
import { addMinutes } from 'date-fns';
import { ResetUserPasswordDto } from '@/dto/users/resetPassword-user.dto';

@Injectable()
export class AuthService {

  constructor(private readonly prismaUsersRepository: PrismaUsersRepository, private readonly jwtService: JwtService) { }

  async login(user) {
    const payload = { sub: user.id, email: user.email }

    return {
      token: this.jwtService.sign(payload)
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.prismaUsersRepository.findByEmail(email)
    if (!user) return null

    const isPasswordValid = compareSync(password, user.password)
    if (!isPasswordValid) return null

    return user
  }

  async sendPasswordResetEmail(email: string) {
    const user = await this.prismaUsersRepository.findByEmail(email)

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const resetToken = randomBytes(32).toString('hex');
    const resetTokenExpiry = addMinutes(new Date(), 1);

    await this.prismaUsersRepository.updateResetToken(user.id, resetToken, resetTokenExpiry)

    const mailOptions = {
      to: `${user.first_name} ${user.last_name}`,
      subject: 'Password Reset',
      text: 'Exemplo de email',
      Botão: resetToken
    }

    return mailOptions
  }

  async resetPassword(reset_token: string, { password }: ResetUserPasswordDto) {
    const user = await this.prismaUsersRepository.findByResetToken(reset_token);

    console.log(user)

    if (!user) {
      throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
    }

    if (user.reset_token_expiry && user.reset_token_expiry < new Date()) {
      await this.prismaUsersRepository.clearResetToken(user.id);
      throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = hashSync(password, 8);

    await this.prismaUsersRepository.updatePassword(user.id, hashedPassword);
    await this.prismaUsersRepository.clearResetToken(user.id);
  }
}



