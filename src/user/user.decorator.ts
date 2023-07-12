import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest<Request>()['user'];
    return data ? user[data] : user;
  },
);
