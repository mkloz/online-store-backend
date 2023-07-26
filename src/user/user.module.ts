import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DbModule } from '@db/db.module';
import { UserController } from './user.controller';
import { ApiConfigModule } from '@config/api-config.module';
import { UserExistConstraint } from '../shared/validators/user-exist.validator';
import { UserRepository } from './user.repository';
import { CartModule } from '@cart/cart.module';

@Module({
  imports: [ApiConfigModule, DbModule, CartModule],
  controllers: [UserController],
  providers: [UserService, UserExistConstraint, UserRepository],
  exports: [UserService],
})
export class UserModule {}
