import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { EmailRegisterDto } from './dto/email-register.dto';
import { UserMailService } from 'src/mail/user-mail.service';
import { TokensDto } from '../dto/tokens.dto';
import { AuthService } from '../auth.service';
import { User } from 'src/user/user.entity';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { IConfig } from 'src/common/config/config';
import { EmailCreateTokenPayload } from './dto/email-token-payload.dto';
import { JwtService } from '@nestjs/jwt';
import { EmailTokenPayloadValidator } from './validators/email-token-payload.validator';
import { Provider } from '@prisma/client';
import { Ok } from 'src/common/dto/ok.dto';

@Injectable()
export class EmailService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly mailService: UserMailService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly cs: ConfigService<IConfig>,
  ) {}
  static invalidTokenException = new UnprocessableEntityException(
    'Invalid token',
  );

  private async generateTokensForUser(email: string): Promise<TokensDto> {
    const user = await this.userService.getByEmail(email, Provider.EMAIL);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.isEmailConfirmed) {
      await this.userService.verify(user.id);
    }
    return await this.authService.generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  }

  async changePassword(id: number, password: string): Promise<Ok> {
    await this.userService.changePassword(id, password, Provider.EMAIL);

    return { ok: true };
  }

  private async generateEmailToken(
    payload: EmailCreateTokenPayload,
  ): Promise<string> {
    const mailJwt = this.cs.get('mail', { infer: true }).jwt;

    return await this.jwtService.signAsync(payload, {
      expiresIn: mailJwt.time,
      secret: mailJwt.secret,
    });
  }

  public async login(username: string, password: string): Promise<TokensDto> {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authService.generateTokens(user);
  }

  async validateUser(email: string, password: string) {
    const user: User = await this.userService.getByEmailVerified(
      email,
      Provider.EMAIL,
    );

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        return { id: user.id, email: user.email, role: user.role };
      }
    }
    return null;
  }

  async confirm(token: string): Promise<TokensDto> {
    let payload;
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: this.cs.get('mail', { infer: true }).jwt.secret,
      });
    } catch (error) {
      throw EmailService.invalidTokenException;
    }

    if (EmailTokenPayloadValidator.validate(payload)) {
      return this.generateTokensForUser(payload.email);
    }

    throw EmailService.invalidTokenException;
  }

  async sendConfirmation(email: string): Promise<Ok> {
    const token = await this.generateEmailToken({ email });

    this.mailService.sendConfirmation(email, token);
    return { ok: true };
  }

  public async register(dto: EmailRegisterDto): Promise<Ok> {
    await this.userService.add(dto);
    await this.sendConfirmation(dto.email);
    return { ok: true };
  }
}
