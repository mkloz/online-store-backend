import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtPayloadValidator } from '../validators/jwt-payload.validator';
import { Role } from '@prisma/client';
import { IConfig } from 'src/common/configs/config.interface';

@Injectable()
export class RoleAuthGuard extends AuthGuard {
  constructor(
    private readonly reflector: Reflector,
    jwtServ: JwtService,
    configServ: ConfigService<IConfig>,
  ) {
    super(jwtServ, configServ);
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const res = await super.canActivate(ctx);
    if (!res) return false;

    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!roles?.length) {
      return true;
    }

    const user: unknown = ctx.switchToHttp().getRequest<Request>()['user'];

    if (JwtPayloadValidator.validate(user) && roles.includes(user?.role)) {
      return true;
    }

    return false;
  }
}
