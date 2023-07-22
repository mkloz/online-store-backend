import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DbModule } from 'src/db/db.module';
import { UserController } from './user.controller';
import { ApiConfigModule } from 'src/config/api-config.module';
import { UserExistConstraint } from './validators/user-exist.validator';
import { UserRepository } from './user.repository';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [ApiConfigModule, DbModule, CartModule],
  controllers: [UserController],
  providers: [UserService, UserExistConstraint, UserRepository],
  exports: [UserService],
})
export class UserModule {}
