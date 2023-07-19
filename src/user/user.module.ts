import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DbModule } from 'src/db/db.module';
import { UserController } from './user.controller';
import { CartItemModule } from './cart-item/cart-item.module';
import { ApiConfigModule } from 'src/config/api-config.module';

@Module({
  imports: [ApiConfigModule, DbModule, CartItemModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
