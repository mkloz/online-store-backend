import { Injectable } from '@nestjs/common';
import fs from 'node:fs/promises';
import { ConfigService } from '@nestjs/config';
import { SendMailOptions, Transporter, createTransport } from 'nodemailer';
import Handlebars from 'handlebars';
import { IConfig } from 'src/common/config/config';

@Injectable()
export class MailerService {
  private readonly transporter: Transporter;
  constructor(private readonly configService: ConfigService<IConfig>) {
    const mail = this.configService.get('mail', { infer: true });

    this.transporter = createTransport(
      {
        host: mail.host,
        port: mail.port,
        secure: mail.secure,
        auth: {
          user: mail.auth.user,
          pass: mail.auth.pass,
        },
      },
      {
        from: {
          name: mail.from.name,
          address: mail.from.address,
        },
      },
    );
  }

  async sendMail({
    templatePath,
    context,
    ...mailOptions
  }: SendMailOptions & {
    templatePath?: string;
    context?: Record<string, unknown>;
  }): Promise<void> {
    let html: string | undefined;
    if (templatePath) {
      const template = await fs.readFile(templatePath, 'utf-8');
      html = Handlebars.compile(template, {
        strict: true,
      })(context);
    }

    await this.transporter.sendMail({
      ...mailOptions,
      html: mailOptions.html ? mailOptions.html : html,
    });
  }
}
