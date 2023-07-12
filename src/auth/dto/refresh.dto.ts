import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class RefreshDto {
  @IsString()
  @MinLength(12)
  @ApiProperty({ example: 'shiovpm.sefdvssfv.ndsgfesdcv' })
  refreshToken: string;
}
