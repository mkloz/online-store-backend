import { Module, forwardRef } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { DbModule } from 'src/db/db.module';
import { AuthModule } from '../auth.module';
import { MailModule } from 'src/mail/mail.module';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    DbModule,
    MailModule,
    UserModule,
    JwtModule,
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
