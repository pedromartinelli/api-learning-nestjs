import { Module } from '@nestjs/common';
// import { ItemsModule } from './modules/items/items.module';
import { UsersModule } from './modules/users/users.module';
import { BackOfficeModule } from './modules/back-office/back-office.module';
import { AuthModule } from './modules/auth/auth.module';
import { ItemsModule } from './modules/items/items.module';
import { APP_GUARD } from '@nestjs/core';
// import { AuthModule } from './modules/auth/auth.module';
import { OrdersModule } from './modules/orders/orders.module';
import { AddressModule } from './modules/address/address.module';
import { ServiceProviderModule } from './modules/service-provider/service-provider.module';

@Module({
  imports: [UsersModule, ItemsModule, BackOfficeModule, AuthModule, OrdersModule, AddressModule, ServiceProviderModule],
  controllers: [],
  providers: []
})
export class AppModule { }
