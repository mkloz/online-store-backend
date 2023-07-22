import {
  Inject,
  Injectable,
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
import { IAuth } from 'src/config/config.interface';
import { EmailTokenPayloadValidator } from './jwt/email-token-payload.validator';
import { Provider } from '@prisma/client';
import { Done } from 'src/common/dto/done.dto';
import { CreateJwtPayload } from '../dto/jwt-payload.dto';
import { JwtService } from '@nestjs/jwt';
import { EmailCreateVerificationTokenPayload } from './jwt/email-verification-token-payload.dto';
import { EmailCreatePassResetTokenPayload } from './jwt/email-pass-reset-token-payload.dto';
import { ApiConfigService } from 'src/config/api-config.service';

@Injectable()
export class AuthEmailService {
  private readonly auth: IAuth;

  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly mailService: UserMailService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly cs: ApiConfigService,
  ) {
    this.auth = this.cs.getAuth();
  }
  static invalidTokenException = new UnprocessableEntityException(
    'Invalid token',
  );

  public generateEmailVerificationToken(
    payload: EmailCreateVerificationTokenPayload,
  ): string {
    const mailJwt = this.auth.mail.jwt.verification;

    return this.jwtService.sign(payload, {
      expiresIn: mailJwt.time,
      secret: mailJwt.secret,
    });
  }

  public generateEmailResetPassToken(
    payload: EmailCreatePassResetTokenPayload,
  ): string {
    const mailJwt = this.auth.mail.jwt.resetPass;

    return this.jwtService.sign(payload, {
      expiresIn: mailJwt.time,
      secret: mailJwt.secret,
    });
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<CreateJwtPayload> {
    const user: User = await this.userService.getByEmailVerified(
      email,
      Provider.EMAIL,
    );

    if (user) {
      if (bcrypt.compareSync(password, String(user.password))) {
        return { id: user.id, email: user.email, role: user.role };
      }
    }

    throw new UnprocessableEntityException('Invalid data');
  }

  public async login(username: string, password: string): Promise<TokensDto> {
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authService.generateTokens(user);
  }

  async verify(token: string): Promise<Done> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.auth.mail.jwt.verification.secret,
      });

      if (!EmailTokenPayloadValidator.validateVerification(payload)) {
        throw AuthEmailService.invalidTokenException;
      }

      await this.userService.verifyByEmail(payload.email);

      return new Done();
    } catch (error) {
      throw AuthEmailService.invalidTokenException;
    }
  }

  async resetPassword(password: string, token: string): Promise<Done> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.auth.mail.jwt.resetPass.secret,
      });

      if (!EmailTokenPayloadValidator.validatePassReset(payload)) {
        throw AuthEmailService.invalidTokenException;
      }

      await this.userService.changePassword(
        payload.id,
        password,
        Provider.EMAIL,
      );

      return new Done();
    } catch (error) {
      throw AuthEmailService.invalidTokenException;
    }
  }

  async forgotPass(email: string): Promise<Done> {
    const user = await this.userService.getByEmail(email);
    const token = this.generateEmailResetPassToken({
      id: user.id,
      email,
    });

    await this.mailService.sendPassReset(email, token);

    return new Done();
  }

  async sendVerification(email: string): Promise<Done> {
    const user = await this.userService.getByEmail(email);
    const token = this.generateEmailVerificationToken({
      id: user.id,
      email,
    });

    await this.mailService.sendVerification(email, token);

    return new Done();
  }

  public async register(dto: EmailRegisterDto): Promise<Done> {
    await this.userService.create(dto);
    await this.sendVerification(dto.email);

    return new Done();
  }
  public async createAdmin(dto: EmailRegisterDto): Promise<Done> {
    const admin = await this.userService.createAdmin(dto);

    if (!admin.isEmailConfirmed) await this.sendVerification(dto.email);

    return new Done();
  }
}
