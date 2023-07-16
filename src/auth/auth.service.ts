import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokensDto } from './dto/tokens.dto';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadValidator } from './validators/jwt-payload.validator';
import { IConfig, IStoreJWT } from 'src/common/configs/config.interface';
import { CreateJwtPayload } from './dto/jwt-payload.dto';
import { Provider } from '@prisma/client';
import { SocialInterface } from './interfaces/social.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private readonly jwt: IStoreJWT;

  constructor(
    private readonly configService: ConfigService<IConfig>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    this.jwt = this.configService.get('onlineStore.jwt', { infer: true });
  }
  static invalidProvider = new UnprocessableEntityException('Invalid provider');
  async validateSocialLogin(
    provider: Provider,
    socialData: SocialInterface,
  ): Promise<TokensDto> {
    let user = await this.userService.getByEmail(socialData.email);

    if (!user) {
      user = await this.userService.add({
        email: socialData.email,
        firstName: socialData.firstName,
        lastName: socialData.lastName,
      });
    } else if (user.provider !== provider) {
      throw AuthService.invalidProvider;
    }

    return this.generateTokens(user);
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

    payload = { id: payload.id, email: payload.email, role: payload.role };
    response.accessToken = await this.generateAccessToken(payload);
    response.refreshToken = await this.generateRefreshToken(payload);

    return response;
  }
}
