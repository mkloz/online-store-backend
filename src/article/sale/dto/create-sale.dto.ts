import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt } from 'class-validator';
import { ArticleExist } from '@shared/validators';

export class CreateSaleDto {
  @IsInt()
  @ApiProperty()
  newPrise: number;

  @IsDateString()
  @ApiProperty()
  activeTill: Date;

  @IsInt()
  @ArticleExist()
  @ApiProperty()
  article: number;
}
