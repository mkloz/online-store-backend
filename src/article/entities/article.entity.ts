import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
import {
  Category,
  CategoryDiscription,
} from '@article/category/entities/category.entity';
import {
  ArticlePhoto,
  ArticlePhotoDiscription,
} from '@article/article-photos/article-photo.entity';

import { Sale, SaleDiscription } from '@article/sale/entities/sale.entity';
import { Article as IArticle, Role } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class ArticleDiscription {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '18 kmph\n120 km max distance' })
  characteristic: string;

  @ApiPropertyOptional({ example: 4.77, nullable: true })
  rating: number | null;

  @ApiProperty({ example: true })
  inStock: boolean;

  @ApiProperty({ example: 199 })
  price: number;

  @ApiProperty({ example: 'You must to buy it' })
  discription: string;

  @ApiProperty({ example: 'Cool Bike', uniqueItems: true })
  name: string;

  @ApiProperty({ example: 9, description: 'excluded for regular users' })
  @Expose({ groups: [Role.ADMIN] })
  count: number;

  @ApiProperty({ example: 8924 })
  views: number;

  @ApiProperty({ example: false })
  isPreviouslyUsed: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
export class ArticleRelation {
  @ApiPropertyOptional({ type: () => ArticlePhotoDiscription, isArray: true })
  images?: ArticlePhoto[];
  @ApiPropertyOptional({ type: () => SaleDiscription, nullable: true })
  sale?: Sale | null;
  @ApiPropertyOptional({ type: () => CategoryDiscription, isArray: true })
  categories?: Category[];
}
export class Article
  extends IntersectionType(ArticleDiscription, ArticleRelation)
  implements IArticle
{
  constructor(partial: Partial<Article>) {
    super();
    Object.assign(this, partial);
    if (this.images?.length) {
      this.images = this.images.map((el) => new ArticlePhoto(el));
    }
    if (this.categories?.length) {
      this.categories = this.categories.map((el) => new Category(el));
    }
    if (this.sale) {
      this.sale = new Sale(this.sale);
    }
  }
}
