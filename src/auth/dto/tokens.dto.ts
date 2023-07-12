import { ApiProperty } from '@nestjs/swagger';
import { RefreshDto } from './refresh.dto';

export class TokensDto extends RefreshDto {
  @ApiProperty({ example: 'wrbesef.vrwsaefd.vwsefvs' })
  accessToken: string;
}
