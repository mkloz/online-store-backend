import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoleAuthGuard } from '@shared/guards';
import { PrismaService } from '@db/prisma.service';
import { Request } from 'express';
import { ApiConfigService } from '@config/api-config.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class OrderBelongsToUserGuard extends RoleAuthGuard {
  constructor(
    private readonly prisma: PrismaService,
    reflector: Reflector,
    jwtService: JwtService,
    cs: ApiConfigService,
  ) {
    super(reflector, jwtService, cs);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const res = await super.canActivate(context);
    if (res) return true;

    const request = context.switchToHttp().getRequest<Request>();

    if (!('user' in request)) {
      return false;
    }
    const order = this.isUserWithId(request.user)
      ? await this.prisma.order.findFirst({
          where: {
            AND: [{ id: +request.params['id'] }, { userId: request.user.id }],
          },
        })
      : null;
    if (!order)
      throw new BadRequestException('Order nether exist or belongs to user');

    return true;
  }

  private isUserWithId(user: unknown): user is { id: number } {
    return (
      !!user &&
      typeof user === 'object' &&
      'id' in user &&
      typeof user.id === 'number'
    );
  }
}
