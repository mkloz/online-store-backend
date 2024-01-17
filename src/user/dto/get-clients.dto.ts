import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationOptionsDto } from '@shared/pagination/pagination-options.dto';

export class GetClientsDto extends PaginationOptionsDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  search?: string;
}
