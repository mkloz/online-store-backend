import { Injectable } from '@nestjs/common';
import fs from 'node:fs/promises';
import { SendMailOptions, Transporter, createTransport } from 'nodemailer';
import Handlebars from 'handlebars';
import { ApiConfigService } from '@config/api-config.service';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';

@Injectable()
export class MailerService {
  private readonly transporter: Transporter;

  constructor(private readonly cs: ApiConfigService) {
    const mail = this.cs.getMail();
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
      const template = readFileSync(templatePath, 'utf-8');

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
