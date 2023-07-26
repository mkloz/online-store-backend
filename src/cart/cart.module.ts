import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartItemModule } from './cart-item/cart-item.module';
import { ApiConfigModule } from '@config/api-config.module';
import { DbModule } from '@db/db.module';

@Module({
  imports: [CartItemModule, ApiConfigModule, DbModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
