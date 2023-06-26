import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from '@/dto/items/create-items.dto';
import { AuthGuard } from '@nestjs/passport'
import { User } from '@prisma/client';


@UseGuards(AuthGuard('jwt'))
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Get()
  async index(@Req() req) {
    return await this.itemsService.index(req.user.id)
  }

  @Post()
  async create(@Body() createdItemData: CreateItemDto, @Req() req) {
    return await this.itemsService.create(createdItemData, req.user)
  }

  @Put(':id') update(
    @Param('id') id: string
  ) {
    return null
  }


  @Get(':id')
  async show(@Param('id') id: string) {
    return null
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string, @Req() req) {
    return await this.itemsService.delete(req.user.id, id)
  }

}

