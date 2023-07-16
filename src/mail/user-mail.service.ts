import { Injectable } from '@nestjs/common';
import { MailerService } from './mailer/mailer.service';
import { ConfigService } from '@nestjs/config';
import { IConfig } from 'src/common/configs/config.interface';

@Injectable()
export class UserMailService {
  constructor(
    private readonly mailer: MailerService,
    private readonly cs: ConfigService<IConfig>,
  ) {}

  async sendVerification(email: string, token: string) {
    await this.mailer.sendMail({
      to: email,
      subject: 'Verification of email',
      text: `${
        this.cs.get('onlineStore', { infer: true }).backendUrl
      }/api/auth/email/verify?token=${token}`,
    });
    return;
  }

  async sendPassReset(email: string, token: string) {
    await this.mailer.sendMail({
      to: email,
      subject: 'Confirmation of email',
      text: `${
        this.cs.get('onlineStore', { infer: true }).backendUrl
      }/api/auth/email/reset/password?token=${token}`,
    });
    return;
  }
}
