import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class NameDto {
  @IsString()
  @Length(2)
  @ApiProperty({ example: 'name' })
  name: string;
}
