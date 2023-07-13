import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { EnvVar, IJWT } from 'src/common/config/config';
import { JwtPayloadValidator } from '../validators/jwt-payload.validator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  static unauthorizedException = new UnauthorizedException();

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw AuthGuard.unauthorizedException;
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<IJWT>(EnvVar.JWT).accessToken.secret,
      });

      if (JwtPayloadValidator.validate(payload)) {
        request['user'] = payload;
        return true;
      } else {
        throw AuthGuard.unauthorizedException;
      }
    } catch {
      throw AuthGuard.unauthorizedException;
    }
  }

  protected extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
