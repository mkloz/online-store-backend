import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches, MaxLength } from 'class-validator';

export class EmailRegisterDto {
  @IsString()
  @MaxLength(255)
  @ApiProperty({ example: 'Mykhailo' })
  name: string;

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
}
