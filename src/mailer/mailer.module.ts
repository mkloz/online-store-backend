import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { ApiConfigModule } from '@config/api-config.module';

@Module({
  imports: [ApiConfigModule],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
