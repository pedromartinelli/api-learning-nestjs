import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ServiceProviderService } from './service-provider.service';
import { CreateServiceProviderDto } from './dto/create-service-provider.dto';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('service-provider')
export class ServiceProviderController {
  constructor(private readonly serviceProviderService: ServiceProviderService) { }

  @Post('register')
  async create(@Body() createServiceProviderDto: CreateServiceProviderDto, @Req() req) {
    return await this.serviceProviderService.registerServiceProvider(createServiceProviderDto, req.user);
  }

  @Get()
  findAll() {
    return this.serviceProviderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceProviderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceProviderDto: UpdateServiceProviderDto) {
    return this.serviceProviderService.update(+id, updateServiceProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceProviderService.remove(+id);
  }
}
