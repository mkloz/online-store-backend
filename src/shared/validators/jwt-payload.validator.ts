import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { UnauthorizedException } from '@nestjs/common';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { IJwtPayload } from '@shared/types';

export class JwtPayloadValidator {
  static validate(payload: unknown): payload is IJwtPayload {
    try {
      const validated = plainToInstance(JwtPayloadDto, payload, {
        enableImplicitConversion: true,
      });
      validateOrReject(validated, {
        skipMissingProperties: false,
      });
    } catch (errors) {
      throw new UnauthorizedException(errors?.toString());
    }

    return true;
  }
}
