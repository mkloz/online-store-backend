import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Category,
  CategoryDiscription,
} from 'src/category/entities/category.entity';
import { File, FileDiscription } from 'src/file/file.entity';
import { Review, ReviewDiscription } from 'src/review/entities/review.entity';
import { Sale, SaleDiscription } from 'src/sale/entities/sale.entity';
import { Article as IArticle } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ArticleDiscription {
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
}

export class Article extends ArticleDiscription implements IArticle {
  @ApiPropertyOptional({ type: () => [FileDiscription] })
  images?: File[];
  @ApiPropertyOptional({ type: () => SaleDiscription })
  sale?: Sale;
  @ApiPropertyOptional({ type: () => [ReviewDiscription] })
  reviews?: Review[];
  @ApiPropertyOptional({ type: () => [CategoryDiscription] })
  categories?: Category[];

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<Article>) {
    super();
    Object.assign(this, partial);
  }
}
