import { Injectable } from '@nestjs/common';
import { MailerService } from '@mailer/mailer.service';
import { ApiConfigService } from '@config/api-config.service';
import { GLOBAL_PREFIX, Prefix } from '@utils/prefix.enum';
import { join } from 'node:path';
import { UserService } from '@user/services/user.service';

@Injectable()
export class AuthMailService {
  private readonly backendUrl: string;
  constructor(
    private readonly mailer: MailerService,
    private readonly cs: ApiConfigService,
    private readonly userService: UserService,
  ) {
    this.backendUrl = this.cs.getOnlineStore().backendUrl;
  }

  async sendVerification(email: string, token: string) {
    const user = await this.userService.getByEmail(email);

    await this.mailer.sendMail({
      to: email,
      subject: 'Verification of email',
      templatePath: join(process.cwd(), 'views', 'mail-verification.hbs'),
      context: {
        email,
        link: `${this.backendUrl}/${GLOBAL_PREFIX}/${Prefix.AUTH_EMAIL}/verify?token=${token}`,
        name: user.name,
      },
    });
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
