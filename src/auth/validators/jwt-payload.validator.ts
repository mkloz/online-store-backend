import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { Logger, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../dto/jwt-payload.dto';
import { Role } from '@prisma/client';

export interface IJwtPayload {
  id: number;
  email: string;
  role: Role;
}

export class JwtPayloadValidator {
  static validate(payload: unknown): payload is IJwtPayload {
    Logger.log(payload);
    try {
      const validated = plainToInstance(JwtPayload, payload, {
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
