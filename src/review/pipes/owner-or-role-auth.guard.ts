import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from 'src/db/prisma.service';
import { RoleAuthGuard } from 'src/auth/guards/role-auth.guard';
import { Reflector } from '@nestjs/core';

@Injectable()
export class OwnerOrRoleAuthGuard extends RoleAuthGuard {
  constructor(
    private readonly prisma: PrismaService,
    reflector: Reflector,
    jwtService: JwtService,
    configService: ConfigService,
  ) {
    super(reflector, jwtService, configService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const res = await super.canActivate(context);
    if (res) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const id = this.extractIDFromRequest(request);

    if (!id) {
      return false;
    }

    if (this.isUserWithId(request['user'])) {
      if (
        await this.prisma.review.findFirst({
          where: { id, authorId: request['user'].id },
        })
      ) {
        return true;
      }
    }

    throw new ForbiddenException('Access olny for owner and special roles');
  }

  private extractIDFromRequest(req: Request): number | undefined {
    let id: number | undefined = undefined;

    id = +req.params.id ?? +req.query.id ?? undefined;

    if ('id' in req.body && typeof req.body.id === 'number') {
      id = req.body.id;
    }

    return id;
  }
  private isUserWithId(user: unknown): user is { id: number } {
    return (
      user &&
      typeof user === 'object' &&
      'id' in user &&
      typeof user.id === 'number'
    );
  }
}
