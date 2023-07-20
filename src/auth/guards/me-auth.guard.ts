import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthGuard } from './auth.guard';
import { ApiConfigService } from 'src/config/api-config.service';

@Injectable()
export class MeAuthGuard extends AuthGuard {
  constructor(jwtService: JwtService, cs: ApiConfigService) {
    super(jwtService, cs);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;

    const res = await super.canActivate(context);
    if (!res) return false;

    const request = context.switchToHttp().getRequest();
    const id = this.extractIDFromRequest(request);

    if (!id) {
      return true;
    }
    if (request['user']?.id) {
      if (id === request['user'].id) {
        return true;
      }
    }

    throw new ForbiddenException('Access olny for owner');
  }

  private extractIDFromRequest(req: Request): number | undefined {
    let id: number | undefined = undefined;
    if (req.method === 'GET') {
      id = +req.params.id ?? +req.query.id ?? undefined;
    } else if (req.method !== 'GET') {
      if ('id' in req.body && typeof req.body.id === 'number') {
        id = req.body.id;
      }
    }

    return id;
  }
}
