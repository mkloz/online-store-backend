import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthGoogleLoginDto {
  @ApiProperty({ example: 'abc' })
  @IsNotEmpty()
  @IsString()
  idToken: string;
}
