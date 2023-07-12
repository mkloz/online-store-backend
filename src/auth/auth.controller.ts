import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { UserNotExistPipe } from '../user/pipes/user-not-exist.pipe';
import { TokensDto } from './dto/tokens.dto';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/refresh.dto';
import { LoginDto } from './dto/login.dto';
import { ApiLogin } from './docs/api-login.decorator';
import { ApiRegister } from './docs/api-register.decorator';
import { ApiRefresh } from './docs/api-refresh.decorator';

@ApiTags('Authorization')
@Controller('auth')
@ApiExtraModels(TokensDto)
export class AuthController {
  constructor(private readonly authServise: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiLogin()
  login(@Body() { email, password }: LoginDto): Promise<TokensDto> {
    return this.authServise.login(email, password);
  }

  @Post('/register')
  @HttpCode(HttpStatus.OK)
  @ApiRegister()
  async register(@Body(UserNotExistPipe) dto: RegisterDto): Promise<TokensDto> {
    return this.authServise.register(dto);
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  @ApiRefresh()
  refresh(@Body() dto: RefreshDto): Promise<TokensDto> {
    return this.authServise.refresh(dto.refreshToken);
  }
}
