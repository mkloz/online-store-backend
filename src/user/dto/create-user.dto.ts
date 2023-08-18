import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(255)
  @ApiProperty({ example: 'Mykhailo' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'email@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Strong@93Kc2!' })
  @IsOptional()
  password?: string;
}
