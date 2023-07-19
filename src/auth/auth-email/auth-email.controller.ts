import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthEmailService } from './auth-email.service';
import { EmailLoginDto } from './dto/email-login.dto';
import { UserNotExistPipe } from 'src/user/pipes/user-not-exist.pipe';
import { EmailRegisterDto } from './dto/email-register.dto';
import { UserExistPipe } from 'src/user/pipes/user-exist.pipe';
import { TokensDto } from '../dto/tokens.dto';
import { ApiEmailRegister } from './docs/api-email-register.decorator';
import { ApiEmailLogin } from './docs/api-email-login.decorator';
import { ApiEmail } from './docs/api-email.decorator';
import { Ok } from 'src/common/dto/ok.dto';
import { ApiEmailConfirm } from './docs/api-email-confirm.decorator';
import { ApiEmailSendConfirmation } from './docs/api-email-send-confirmation.decorator';
import { ApiEmailPasswortReset } from './docs/api-email-passwort-reset.decorator';

import { EmailPasswordResetDto } from './dto/email-password-reset.dto';
import { EmailTokenDto } from './dto/email-token.dto';
import { EmailDto } from './dto/email.dto';
import { RoleAuthGuard } from '../guards/role-auth.guard';
import { Role } from '@prisma/client';
import { Roles } from '../decorators/roles.decorator';
import { ApiAdminCreate } from './docs/api-admin-create.decorator';

@ApiEmail()
@Controller('auth/email')
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
  async register(@Body(UserNotExistPipe) dto: EmailRegisterDto): Promise<Ok> {
    return this.emailService.register(dto);
  }

  @Post('add/admin')
  @Roles(Role.ADMIN)
  @UseGuards(RoleAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiAdminCreate()
  createAdmin(@Body() dto: EmailRegisterDto): Promise<Ok> {
    return this.emailService.createAdmin(dto);
  }

  @Post('/confirm')
  @ApiEmailConfirm()
  @HttpCode(HttpStatus.OK)
  verify(@Query() { token }: EmailTokenDto): Promise<Ok> {
    return this.emailService.verify(token);
  }

  @Post('/verify')
  @HttpCode(HttpStatus.OK)
  @ApiEmailSendConfirmation()
  async sendVerification(
    @Query(UserExistPipe) { email }: EmailDto,
  ): Promise<Ok> {
    return this.emailService.sendVerification(email);
  }

  @Post('/forgot/password')
  @HttpCode(HttpStatus.OK)
  @ApiEmailSendConfirmation()
  async sendPasswordReset(
    @Query(UserExistPipe) { email }: EmailDto,
  ): Promise<Ok> {
    return this.emailService.forgotPass(email);
  }

  @Post('/reset/password')
  @HttpCode(HttpStatus.OK)
  @ApiEmailPasswortReset()
  resetPassword(@Body() dto: EmailPasswordResetDto): Promise<Ok> {
    return this.emailService.resetPassword(dto.password, dto.token);
  }
}
