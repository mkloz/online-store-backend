import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'email@gmail.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'secret_password' })
  password: string;
}
