import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EmailConfirmDto {
  @IsString()
  @ApiProperty({ example: 'wsdgv.gbtrsedrtdgargdfsg.sergfawrzr' })
  token: string;
}
