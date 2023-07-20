import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayloadValidator } from '../validators/jwt-payload.validator';
import { ApiConfigService } from 'src/config/api-config.service';
import { IStoreJWT } from 'src/config/config.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly storeJWT: IStoreJWT;

  constructor(
    private readonly jwtService: JwtService,
    private readonly cs: ApiConfigService,
  ) {
    this.storeJWT = this.cs.getOnlineStore().jwt;
  }

  static invalidTokenException = new UnprocessableEntityException(
    'Invalid token',
  );

  static unauthorizedException = new UnauthorizedException();

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw AuthGuard.unauthorizedException;
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.storeJWT.accessToken.secret,
      });

      if (JwtPayloadValidator.validate(payload)) {
        request['user'] = payload;
        return true;
      } else {
        throw AuthGuard.invalidTokenException;
      }
    } catch {
      throw AuthGuard.invalidTokenException;
    }
  }

  protected extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
