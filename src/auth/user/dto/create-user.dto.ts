import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ example: 'Mykhailo' })
  firstName: string;

  @ApiProperty({ example: 'Kloz' })
  lastName: string;

  @ApiProperty({ example: 'email@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Strong@93Kc2!' })
  @IsOptional()
  password?: string;
}
