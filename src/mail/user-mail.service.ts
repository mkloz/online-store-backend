import { Injectable } from '@nestjs/common';
import { MailerService } from './mailer/mailer.service';
import { ApiConfigService } from '@config/api-config.service';

@Injectable()
export class UserMailService {
  private readonly backendUrl: string;

  constructor(
    private readonly mailer: MailerService,
    private readonly cs: ApiConfigService,
  ) {
    this.backendUrl = this.cs.getOnlineStore().backendUrl;
  }

  async sendVerification(email: string, token: string) {
    await this.mailer.sendMail({
      to: email,
      subject: 'Verification of email',
      text: `${this.backendUrl}/api/auth/email/verify?token=${token}`,
    });
    return;
  }

  async sendPassReset(email: string, token: string) {
    await this.mailer.sendMail({
      to: email,
      subject: 'Confirmation of email',
      text: `${this.backendUrl}/api/auth/email/reset/password?token=${token}`,
    });
    return;
  }
}
