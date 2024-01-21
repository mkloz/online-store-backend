import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'email'] as const),
) {
  @ApiPropertyOptional({ example: '2832346686' })
  @IsOptional()
  @IsPhoneNumber('GB')
  phoneNumber?: string;

  @IsString()
  @Length(4, 300)
  @IsOptional()
  @ApiProperty({ example: '23 Street' })
  street?: string;

  @IsString()
  @IsOptional()
  @Length(1, 300)
  @ApiProperty({ example: 'City' })
  city?: string;

  @IsString()
  @IsOptional()
  @Length(1, 300)
  @ApiProperty({ example: 'United Kingdom' })
  country?: string;

  @IsPostalCode('GB')
  @IsOptional()
  @ApiProperty({ example: 'DT2 9NJ' })
  postCode?: string;
}
