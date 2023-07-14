import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Param,
  Query,
  Get,
  UseGuards,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailLoginDto } from './dto/email-login.dto';
import { UserNotExistPipe } from 'src/user/pipes/user-not-exist.pipe';
import { EmailRegisterDto } from './dto/email-register.dto';
import { UserExistPipe } from 'src/user/pipes/user-exist.pipe';
import { TokensDto } from '../dto/tokens.dto';
import { ApiEmailRegister } from './docs/api-email-register.decorator';
import { ApiEmailLogin } from './docs/api-email-login.decorator';
import { ApiEmail } from './docs/api-email.decorator';
import { Ok } from 'src/common/dto/ok.dto';
import { EmailSendConfirmation } from './dto/email-send-confirmation.dto';
import { EmailConfirmDto } from './dto/email-confirm.dto';
import { ApiEmailConfirm } from './docs/api-email-confirm.decorator';
import { ApiEmailSendConfirmation } from './docs/api-email-send-confirmation.decorator';
import { ApiEmailPasswortReset } from './docs/api-email-passwort-reset.decorator';
import { User } from 'src/user/user.decorator';
import { JwtPayload } from '../dto/jwt-payload.dto';
import { EmailPasswordResetDto } from './dto/email-password-reset.dto';
import { AuthGuard } from '../guards/auth.guard';

@ApiEmail()
@Controller('auth/email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiEmailLogin()
  login(
    @Body(UserExistPipe) { email, password }: EmailLoginDto,
  ): Promise<TokensDto> {
    return this.emailService.login(email, password);
  }

  @Post('/register')
  @HttpCode(HttpStatus.OK)
  @ApiEmailRegister()
  async register(@Body(UserNotExistPipe) dto: EmailRegisterDto): Promise<Ok> {
    return this.emailService.register(dto);
  }

  @Get('/confirm')
  @ApiEmailConfirm()
  @HttpCode(HttpStatus.OK)
  async confirm(@Query() { token }: EmailConfirmDto): Promise<TokensDto> {
    return this.emailService.confirm(token);
  }

  @Post('/send-confirmation/:email')
  @HttpCode(HttpStatus.OK)
  @ApiEmailSendConfirmation()
  async sendConfirmation(
    @Param(UserExistPipe) { email }: EmailSendConfirmation,
  ): Promise<Ok> {
    return this.emailService.sendConfirmation(email);
  }

  @Post('/reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiEmailPasswortReset()
  @UseGuards(AuthGuard)
  resetPassword(
    @User() user: JwtPayload,
    @Body() { password }: EmailPasswordResetDto,
  ): Promise<Ok> {
    return this.emailService.changePassword(user.id, password);
  }
}
