import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadValidator } from '../validators';
import { ApiConfigService } from '@config/api-config.service';
import { IStoreJWT } from '@config/config.interface';
import { Extractor } from '@utils/extractors';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly storeJWT: IStoreJWT;

  constructor(
    private readonly jwtService: JwtService,
    private readonly cs: ApiConfigService,
  ) {
    this.storeJWT = this.cs.getOnlineStore().jwt;
  }

  static unauthorizedException = new UnauthorizedException();

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = Extractor.extractBearerToken(request);

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
      }

      throw AuthGuard.unauthorizedException;
    } catch {
      throw AuthGuard.unauthorizedException;
    }
  }
}
