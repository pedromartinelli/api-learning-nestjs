import { Controller, Post, Get, Body, Put, Delete, Param, Query, UseGuards, Req } from '@nestjs/common'
import { CreateUserDto } from '@/dto/users/create-user.dto'
import { UsersService } from '@/modules/users/users.service'
import { UpdateUserDto } from '@/dto/users/update-user.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async index() {
    return await this.usersService.index()
  }

  @Post()
  async create(@Body() createdUserData: CreateUserDto) {
    return await this.usersService.create(createdUserData)
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() updatedUserData: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updatedUserData)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async show(@Req() req: any) {
    return await this.usersService.show(req.user.id)
  }

  // @Get(':id')
  // @UseGuards(AuthGuard('jwt'))
  // async show(@Param('id') id: string) {
  //   return await this.usersService.show(id)
  // }

  // @Get('/email')
  // async show(@Query('email') email: string) {
  //   return await this.usersService.show(email)
  // }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string) {
    return null
  }
}
