import { Module } from '@nestjs/common';
import { UserMailService } from './user-mail.service';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [MailerModule],
  providers: [UserMailService],
  exports: [UserMailService],
})
export class MailModule {}
