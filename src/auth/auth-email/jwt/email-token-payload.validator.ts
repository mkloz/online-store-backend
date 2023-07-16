import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { UnauthorizedException } from '@nestjs/common';
import { EmailVerificationTokenPayload } from './email-verification-token-payload.dto';
import { EmailPassResetTokenPayload } from './email-pass-reset-token-payload.dto';

export interface IEmailVerificationTokenPayload {
  id: number;
  email: string;
  iat: number;
  exp: number;
}
export interface IEmailPassResetTokenPayload {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

export class EmailTokenPayloadValidator {
  static validateVerification(
    payload: unknown,
  ): payload is IEmailVerificationTokenPayload {
    try {
      const validated = plainToInstance(
        EmailVerificationTokenPayload,
        payload,
        {
          enableImplicitConversion: true,
        },
      );
      validateOrReject(validated, {
        skipMissingProperties: false,
      });
    } catch (errors) {
      if (errors) {
        throw new UnauthorizedException(errors.toString());
      }
    }

    return true;
  }
  static validatePassReset(
    payload: unknown,
  ): payload is IEmailPassResetTokenPayload {
    try {
      const validated = plainToInstance(EmailPassResetTokenPayload, payload, {
        enableImplicitConversion: true,
      });
      validateOrReject(validated, {
        skipMissingProperties: false,
      });
    } catch (errors) {
      if (errors) throw new UnauthorizedException(errors.toString());
    }

    return true;
  }
}
