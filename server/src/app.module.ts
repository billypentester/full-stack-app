import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/datasource';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

import { ConnectionMiddleware } from './../middleware/connection.middleware'

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    ProductModule,
    OrderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ConnectionMiddleware)
      .forRoutes('*');
  }
}
