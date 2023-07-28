import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { DbModule } from '@db/db.module';
import { UserController } from './user.controller';
import { ApiConfigModule } from '@config/api-config.module';
import { UserExistConstraint } from '../shared/validators/user-exist.validator';
import { UserRepository } from './user.repository';
import { CartModule } from '@cart/cart.module';
import { MailerModule } from '@mailer/mailer.module';
import { UserMailService } from './services/user-mail.service';

@Module({
  imports: [ApiConfigModule, DbModule, CartModule, MailerModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserExistConstraint,
    UserRepository,
    UserMailService,
  ],
  exports: [UserService, UserMailService],
})
export class UserModule {}
