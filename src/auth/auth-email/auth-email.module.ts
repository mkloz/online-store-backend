import { Module, forwardRef } from '@nestjs/common';
import { AuthEmailService } from './services/auth-email.service';
import { AuthEmailController } from './auth-email.controller';
import { DbModule } from '@db/db.module';
import { AuthModule } from '../auth.module';
import { UserModule } from '@user/user.module';
import { ApiConfigModule } from '@config/api-config.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthMailService } from './services/auth-mail.service';
import { MailerModule } from '@mailer/mailer.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    DbModule,
    UserModule,
    ApiConfigModule,
    JwtModule,
    MailerModule,
  ],
  controllers: [AuthEmailController],
  providers: [AuthEmailService, AuthMailService],
  exports: [AuthMailService],
})
export class AuthEmailModule {}
