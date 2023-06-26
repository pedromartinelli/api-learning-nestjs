import { Module } from '@nestjs/common';
import { ServiceProviderService } from './service-provider.service';
import { ServiceProviderController } from './service-provider.controller';
import { PrismaService } from '@/database/prisma.service';
import { PrismaItemsRepository } from '@/repositories/prisma/prisma-items-repository';
import { PrismaServiceProviderRepository } from '@/repositories/prisma/prisma-serviceProvider-repository';


@Module({
  providers: [ServiceProviderService, PrismaService, PrismaItemsRepository, PrismaServiceProviderRepository],
  controllers: [ServiceProviderController]
})
export class ServiceProviderModule {}
