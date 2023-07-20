import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Category,
  CategoryDiscription,
} from 'src/category/entities/category.entity';
import { File, FileDiscription } from 'src/file/file.entity';
import { Review, ReviewDiscription } from 'src/review/entities/review.entity';
import { Sale, SaleDiscription } from 'src/sale/entities/sale.entity';
import { Article as IArticle, Role } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class ArticleDiscription {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '18 kmph\n120 km max distance' })
  characteristic: string;

  @ApiPropertyOptional({ example: 4.77 })
  rating: number;

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
    if (this.images?.length) {
      this.images = this.images.map((el) => new File(el));
    }
    if (this.reviews?.length) {
      this.reviews = this.reviews.map((el) => new Review(el));
    }
    if (this.categories?.length) {
      this.categories = this.categories.map((el) => new Category(el));
    }
    if (this.sale) {
      this.sale = new Sale(this.sale);
    }
  }
}
