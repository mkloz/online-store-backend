import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { UnauthorizedException } from '@nestjs/common';
import { EmailTokenPayload } from '../dto/email-token-payload.dto';

export interface IEmailTokenPayload {
  email: string;
  iat: number;
  exp: number;
}

export class EmailTokenPayloadValidator {
  static validate(payload: unknown): payload is IEmailTokenPayload {
    try {
      const validated = plainToInstance(EmailTokenPayload, payload, {
        enableImplicitConversion: true,
      });
      validateOrReject(validated, {
        skipMissingProperties: false,
      });
    } catch (errors) {
      if (errors.length > 0) {
        throw new UnauthorizedException(errors.toString());
      }
    }

    return true;
  }
}
