import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateArticleDto } from '../dto/create-article.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class RelationsExistsPipe
  implements PipeTransform<CreateArticleDto, Promise<CreateArticleDto>>
{
  constructor(private readonly prisma: PrismaService) {}

  async checkImagesExistance(images: number[]) {
    if (images.length) {
      const files = await this.prisma.file.findMany({
        where: { id: { in: images } },
      });
      if (images.some((el) => !files.map((el) => el.id).includes(el)))
        throw new BadRequestException('File does not exist');
    }
  }
  async checkSaleExistance(value: number) {
    if (value) {
      const sale = await this.prisma.sale.findUnique({
        where: { id: value },
      });
      if (!sale) throw new BadRequestException('Sale does not exist');
    }
  }
  async checkReviewsExistance(reviewsArr: number[]) {
    if (reviewsArr.length) {
      const reviews = await this.prisma.review.findMany({
        where: { id: { in: reviewsArr } },
      });
      if (reviewsArr.some((el) => !reviews.map((el) => el.id).includes(el)))
        throw new BadRequestException('Review does not exist');
    }
  }
  async checkCategoriesExistance(categoriesArr: number[]) {
    if (categoriesArr.length) {
      const categories = await this.prisma.category.findMany({
        where: { id: { in: categoriesArr } },
      });
      if (
        categoriesArr.some((el) => !categories.map((el) => el.id).includes(el))
      )
        throw new BadRequestException('Category does not exist');
    }
  }
  async transform(value: CreateArticleDto) {
    await Promise.all([
      this.checkImagesExistance(value.images),
      this.checkSaleExistance(value.sale),
      this.checkReviewsExistance(value.reviews),
      this.checkCategoriesExistance(value.categories),
    ]);

    return value;
  }
}
