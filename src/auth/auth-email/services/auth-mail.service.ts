import { Injectable } from '@nestjs/common';
import { MailerService } from '@mailer/mailer.service';
import { ApiConfigService } from '@config/api-config.service';
import { GLOBAL_PREFIX, Prefix } from '@utils/prefix.enum';

@Injectable()
export class AuthMailService {
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
      text: `${this.backendUrl}/${GLOBAL_PREFIX}/${Prefix.AUTH_EMAIL}/verify?token=${token}`,
    });
    return;
  }

  async sendPassReset(email: string, token: string) {
    await this.mailer.sendMail({
      to: email,
      subject: 'Confirmation of email',
      text: `${this.backendUrl}/${GLOBAL_PREFIX}/${Prefix.AUTH_EMAIL}/reset/password?token=${token}`,
    });
    return;
  }
}
