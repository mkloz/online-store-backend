import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartItemModule } from './cart-item/cart-item.module';
import { ApiConfigModule } from '@config/api-config.module';
import { DbModule } from '@db/db.module';
import { ArticleModule } from '@article/article.module';
import { CartNotEmptyConstraint } from '@shared/validators/cart-exist.validator';

@Module({
  imports: [CartItemModule, ApiConfigModule, DbModule, ArticleModule],
  controllers: [CartController],
  providers: [CartService, CartNotEmptyConstraint],
  exports: [CartService],
})
export class CartModule {}
