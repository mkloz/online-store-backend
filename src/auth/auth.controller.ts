import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { TokensDto } from './dto/tokens.dto';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/refresh.dto';
import { ApiRefresh } from './docs/api-refresh.decorator';
import { ApiAuth } from './docs/api-auth.decorator';
import { Prefix } from '@utils/prefix.enum';

@Controller(Prefix.AUTH)
@ApiAuth()
export class AuthController {
  constructor(private readonly authServise: AuthService) {}

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  @ApiRefresh()
  refresh(@Body() dto: RefreshDto): Promise<TokensDto> {
    return this.authServise.refresh(dto.refreshToken);
  }
}
