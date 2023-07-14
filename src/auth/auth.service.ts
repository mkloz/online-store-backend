import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokensDto } from './dto/tokens.dto';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadValidator } from './validators/jwt-payload.validator';
import { IConfig, IStoreJWT } from 'src/common/config/config';
import { CreateJwtPayload } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  private readonly jwt: IStoreJWT;

  constructor(
    private readonly configService: ConfigService<IConfig>,
    private readonly jwtService: JwtService,
  ) {
    this.jwt = this.configService.get('onlineStore.jwt', { infer: true });
  }

  public async refresh(token: string) {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: this.jwt.refreshToken.secret,
    });

    if (JwtPayloadValidator.validate(payload)) {
      return await this.generateTokens({
        id: payload.id,
        email: payload.email,
        role: payload.role,
      });
    }

    throw new BadRequestException('Invalid JWT token');
  }

  private async generateAccessToken(
    payload: CreateJwtPayload,
  ): Promise<string> {
    const configJwtAccess = this.jwt.accessToken;

    return await this.jwtService.signAsync(payload, {
      expiresIn: configJwtAccess.time,
      secret: configJwtAccess.secret,
    });
  }
  private async generateRefreshToken(
    payload: CreateJwtPayload,
  ): Promise<string> {
    const configJwtRefresh = this.jwt.refreshToken;

    return await this.jwtService.signAsync(payload, {
      expiresIn: configJwtRefresh.time,
      secret: configJwtRefresh.secret,
    });
  }

  public async generateTokens(payload: CreateJwtPayload): Promise<TokensDto> {
    const response = new TokensDto();

    response.accessToken = await this.generateAccessToken(payload);
    response.refreshToken = await this.generateRefreshToken(payload);

    return response;
  }
}
