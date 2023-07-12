import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { TokensDto } from './dto/tokens.dto';
import { ConfigService } from '@nestjs/config';
import { EnvVar, IJWT } from 'src/common/config/config';
import {
  IJwtPayload,
  JwtPayloadValidator,
} from './validators/jwt-payload.validator';
import { User } from '../user/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(username: string, password: string): Promise<TokensDto> {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.generateTokens(user);
  }

  public async refresh(token: string) {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<IJWT>('jwt').refreshToken.secret,
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

  public async register(dto: CreateUserDto) {
    await this.userService.add(dto);

    return this.login(dto.email, dto.password);
  }

  private async generateAccessToken(payload: IJwtPayload): Promise<string> {
    const configJwtAccess = this.configService.get<IJWT>(
      EnvVar.JWT,
    ).accessToken;

    return await this.jwtService.signAsync(payload, {
      expiresIn: configJwtAccess.time,
      secret: configJwtAccess.secret,
    });
  }
  private async generateRefreshToken(payload: IJwtPayload): Promise<string> {
    const configJwtRefresh = this.configService.get<IJWT>('jwt').refreshToken;

    return await this.jwtService.signAsync(payload, {
      expiresIn: configJwtRefresh.time,
      secret: configJwtRefresh.secret,
    });
  }
  private async generateTokens(payload: IJwtPayload): Promise<TokensDto> {
    const response = new TokensDto();

    response.accessToken = await this.generateAccessToken(payload);
    response.refreshToken = await this.generateRefreshToken(payload);

    return response;
  }
  async validateUser(email: string, password: string) {
    const user: User = await this.userService.getByEmail(email);
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        return { id: user.id, email: user.email, role: user.role };
      }
    }
    return null;
  }
}
