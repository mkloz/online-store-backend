import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { DbModule } from 'src/db/db.module';
import { ApiConfigModule } from 'src/config/api-config.module';

@Module({
  imports: [ApiConfigModule, DbModule],
  controllers: [CartItemController],
  providers: [CartItemService],
  exports: [CartItemService],
})
export class CartItemModule {}
