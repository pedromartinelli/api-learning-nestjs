import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, HttpStatus, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ResetUserPasswordDto } from '@/dto/users/resetPassword-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return await this.authService.sendPasswordResetEmail(email);
  }

  @Post('reset-password')
  async resetPassword(@Query('reset_token') reset_token: string, @Body() userData: ResetUserPasswordDto) {
    await this.authService.resetPassword(reset_token, userData);
  }
}
