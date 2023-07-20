import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class EmailTokenDto {
  @IsJWT()
  @ApiProperty({ example: 'wsdgv.gbtrsedrtdgargdfsg.sergfawrzr' })
  token: string;
}
