import { Module, forwardRef } from '@nestjs/common';
import { AuthEmailService } from './auth-email.service';
import { AuthEmailController } from './auth-email.controller';
import { DbModule } from '@db/db.module';
import { AuthModule } from '../auth.module';
import { UserModule } from '@user/user.module';
import { ApiConfigModule } from '@config/api-config.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    DbModule,
    UserModule,
    ApiConfigModule,
    JwtModule,
  ],
  controllers: [AuthEmailController],
  providers: [AuthEmailService],
})
export class AuthEmailModule {}
