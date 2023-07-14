import { Injectable } from '@nestjs/common';
import { MailerService } from './mailer/mailer.service';
import { ConfigService } from '@nestjs/config';
import { IConfig } from 'src/common/config/config';

@Injectable()
export class UserMailService {
  // private confirmationTemplate: TemplateDelegate;
  // private passwordResetTemplate: TemplateDelegate;
  // private groupInviteTemplate: TemplateDelegate;

  constructor(
    private readonly mailer: MailerService,
    private readonly cs: ConfigService<IConfig>,
  ) {}

  sendConfirmation(email: string, token: string) {
    this.mailer.sendMail({
      to: email,
      subject: 'Confirmation of email',
      text: `${
        this.cs.get('onlineStore', { infer: true }).projectUrl
      }/api/auth/email/confirm?token=${token}`,
    });
  }

  sendUserHello(email: string) {
    this.mailer.sendMail({
      to: email,
      subject: 'Welcome user!',
      text: 'Hello!!!',
    });
  }
}
