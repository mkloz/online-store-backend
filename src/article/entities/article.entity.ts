import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { File } from 'src/file/file.entity';
import { Review } from 'src/review/entities/review.entity';
import { Sale } from 'src/sale/entities/sale.entity';

export class Article {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'bike' })
  type: string;
  @ApiProperty({ example: 199 })
  price: number;
  @ApiProperty({ example: 'You must to buy it' })
  discription: string;
  @ApiProperty({ example: 'Cool Bike', uniqueItems: true })
  name: string;
  @ApiProperty({ example: 9 })
  count: number;
  @ApiProperty({ example: 'kids' })
  ageGroup: string;
  @ApiProperty({ example: 8924 })
  views: number;
  @ApiProperty({ example: 'unisex' })
  gender: string;
  @ApiProperty({ example: false })
  isPreviouslyUsed: boolean;
  @ApiProperty({ type: Date })
  createdAt: Date;
  @ApiProperty({ type: Date })
  updatedAt: Date;
  @ApiProperty()
  images?: File[];
  @ApiPropertyOptional({ type: () => Sale })
  sale?: Sale;
  @ApiPropertyOptional()
  reviews?: Review[];
}
