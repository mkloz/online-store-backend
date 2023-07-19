import { Module } from '@nestjs/common';
import { UserMailService } from './user-mail.service';
import { MailerModule } from './mailer/mailer.module';
import { ApiConfigModule } from 'src/config/api-config.module';

@Module({
  imports: [ApiConfigModule, MailerModule],
  providers: [UserMailService],
  exports: [UserMailService],
})
export class MailModule {}
