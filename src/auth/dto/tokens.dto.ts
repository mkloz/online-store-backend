import { ApiProperty } from '@nestjs/swagger';
import { RefreshDto } from './refresh.dto';
import { IsJWT } from 'class-validator';

export class TokensDto extends RefreshDto {
  @IsJWT()
  @ApiProperty({ example: 'wrbesef.vrwsaefd.vwsefvs' })
  accessToken: string;
}
