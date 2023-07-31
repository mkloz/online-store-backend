import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './order.controller';
import { ApiConfigModule } from '@config/api-config.module';
import { CartModule } from '@cart/cart.module';
import { OrderMailService } from './services/order-mail.service';
import { DbModule } from '@db/db.module';
import { MailerModule } from '@mailer/mailer.module';
import { UserModule } from '@user/user.module';

@Module({
  imports: [ApiConfigModule, CartModule, DbModule, UserModule, MailerModule],
  controllers: [OrderController],
  providers: [OrderService, OrderMailService],
  exports: [OrderService, OrderMailService],
})
export class OrderModule {}
