import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayloadValidator } from '../validators/jwt-payload.validator';
import { IConfig } from 'src/common/config/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<IConfig>,
  ) {}
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
        secret: this.configService.get('onlineStore.jwt', { infer: true })
          .accessToken.secret,
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
