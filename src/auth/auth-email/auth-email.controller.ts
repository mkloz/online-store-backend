import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Query,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { AuthEmailService } from './services/auth-email.service';
import { EmailLoginDto } from './dto/email-login.dto';
import { UserNotExistPipe } from '@user/pipes/user-not-exist.pipe';
import { EmailRegisterDto } from './dto/email-register.dto';
import { UserExistPipe } from '@user/pipes/user-exist.pipe';
import { TokensDto } from '../dto/tokens.dto';
import { ApiEmailRegister } from './docs/api-email-register.decorator';
import { ApiEmailLogin } from './docs/api-email-login.decorator';
import { ApiEmail } from './docs/api-email.decorator';
import { Done } from '@shared/dto/done.dto';
import { ApiEmailConfirm } from './docs/api-email-confirm.decorator';
import { ApiEmailSendConfirmation } from './docs/api-email-send-confirmation.decorator';
import {
  ApiEmailPasswordChange,
  ApiEmailPasswordReset,
} from './docs/api-email-passwort-reset.decorator';

import { EmailPasswordResetDto } from './dto/email-password-reset.dto';
import { EmailTokenDto } from './dto/email-token.dto';
import { EmailDto } from './dto/email.dto';
import { AuthGuard, RoleAuthGuard } from '@shared/guards';
import { Role } from '@prisma/client';
import { Roles } from '../../shared/decorators/roles.decorator';
import { ApiAdminCreate } from './docs/api-admin-create.decorator';
import { Prefix } from '@utils/prefix.enum';
import { User as UserEnt } from '@user/user.entity';
import { EmailPasswordChangeDto } from './dto/email-password-change.dto';
import { JwtPayloadDto } from '@shared/dto';
import { User } from '@shared/decorators';

@ApiEmail()
@Controller(Prefix.AUTH_EMAIL)
@UseInterceptors(ClassSerializerInterceptor)
export class AuthEmailController {
  constructor(private readonly emailService: AuthEmailService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiEmailLogin()
  login(
    @Body(UserExistPipe) { email, password }: EmailLoginDto,
  ): Promise<TokensDto> {
    return this.emailService.login(email, password);
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiEmailRegister()
  async register(
    @Body(UserNotExistPipe) dto: EmailRegisterDto,
  ): Promise<UserEnt> {
    return this.emailService.register(dto);
  }

  @Post('add/admin')
  @Roles(Role.ADMIN)
  @UseGuards(RoleAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiAdminCreate()
  createAdmin(@Body() dto: EmailRegisterDto): Promise<UserEnt> {
    return this.emailService.createAdmin(dto);
  }

  @Post('/verify')
  @ApiEmailConfirm()
  @HttpCode(HttpStatus.OK)
  async verify(@Query() { token }: EmailTokenDto): Promise<Done> {
    return this.emailService.verify(token);
  }

  @Post('/send/verification')
  @HttpCode(HttpStatus.OK)
  @ApiEmailSendConfirmation()
  async sendVerification(
    @Query(UserExistPipe) { email }: EmailDto,
  ): Promise<Done> {
    return this.emailService.sendVerification(email);
  }

  @Post('/forgot/password')
  @HttpCode(HttpStatus.OK)
  @ApiEmailSendConfirmation()
  async sendPasswordReset(
    @Query(UserExistPipe) { email }: EmailDto,
  ): Promise<Done> {
    return this.emailService.forgotPass(email);
  }

  @Post('/reset/password')
  @HttpCode(HttpStatus.OK)
  @ApiEmailPasswordReset()
  resetPassword(@Body() dto: EmailPasswordResetDto): Promise<Done> {
    return this.emailService.resetPassword(dto.password, dto.token);
  }

  @Post('/change/password')
  @HttpCode(HttpStatus.OK)
  @ApiEmailPasswordChange()
  @UseGuards(AuthGuard)
  changePassword(
    @User() user: JwtPayloadDto,
    @Body() dto: EmailPasswordChangeDto,
  ): Promise<Done> {
    return this.emailService.changePassword(dto, user.email);
  }
}
