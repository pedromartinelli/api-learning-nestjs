import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { BackOfficeService } from './back-office.service';
import { UpdateUserAuthorizationDto } from './dto/update-UserAuthorization.dto';

@Controller('back-office')
export class BackOfficeController {
  constructor(private readonly backOfficeService: BackOfficeService) {}

  @Get()
  findAll() {
    return this.backOfficeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.backOfficeService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserAuthorizationDto: UpdateUserAuthorizationDto) {
    return this.backOfficeService.update(id, updateUserAuthorizationDto);
  }
}
