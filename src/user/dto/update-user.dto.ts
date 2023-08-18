import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ArticleExist } from '@shared/validators';
import { IsArray, IsInt, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'email'] as const),
) {
  @IsInt({ each: true })
  @ArticleExist({ each: true })
  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({ example: [1, 2, 3] })
  favorites?: number[];
}
