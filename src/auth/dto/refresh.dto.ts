import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class RefreshDto {
  @IsJWT()
  @ApiProperty({ example: 'shiovpm.sefdvssfv.ndsgfesdcv' })
  refreshToken: string;
}
