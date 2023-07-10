import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @MaxLength(3000)
  @ApiProperty({ example: 'Not bad' })
  text: string;
  @IsInt()
  @Max(5)
  @Min(0)
  @ApiProperty({ example: 5 })
  stars: number;
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  article?: number;
}
