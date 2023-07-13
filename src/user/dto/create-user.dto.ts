import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  @MaxLength(255)
  @MinLength(4)
  @ApiProperty({ example: 'Mykhailo' })
  firstName: string;

  @IsString()
  @MaxLength(255)
  @MinLength(4)
  @ApiProperty({ example: 'Kloz' })
  lastName: string;

  @IsEmail()
  @ApiProperty({ example: 'email@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Strong@93Kc2!' })
  @IsOptional()
  password?: string;

  @IsInt({ each: true })
  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({ example: [1, 2, 3] })
  reviews?: number[] = [];
}
