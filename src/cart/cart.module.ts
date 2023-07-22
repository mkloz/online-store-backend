import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartItemModule } from './cart-item/cart-item.module';
import { ApiConfigModule } from 'src/config/api-config.module';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [CartItemModule, ApiConfigModule, DbModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
