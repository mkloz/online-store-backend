import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayloadValidator } from '../validators/jwt-payload.validator';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest<Request>()['user'];
    if (JwtPayloadValidator.validate(user)) {
      return user;
    }
    return undefined;
  },
);
