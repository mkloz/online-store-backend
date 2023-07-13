import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(4, 255)
  @ApiProperty({ example: 'Mykhailo' })
  firstName: string;
  @IsString()
  @Length(4, 255)
  @ApiProperty({ example: 'Kloz' })
  lastName: string;

  @IsEmail()
  @ApiProperty({ example: 'email@gmail.com' })
  email: string;

  @IsString()
  @Length(8, 20)
  @Matches(/(?=.*?[A-Z])/, {
    message: 'Missing a upper case leters in pasword',
  })
  @Matches(/(?=.*?[a-z])/, {
    message: 'Missing a lower case leters in pasword',
  })
  @Matches(/(?=.*?[0-9])/, {
    message: 'Missing a numbers in pasword',
  })
  @Matches(/(?=.*?[#?!@$%^&*-])/, {
    message: 'Missing a special charecters in pasword',
  })
  @ApiProperty({ example: 'Strong@93Kc2!' })
  password: string;

  @IsInt({ each: true })
  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({ example: [1, 2, 3] })
  reviews?: number[] = [];
}
