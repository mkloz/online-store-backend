import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateArticleDto } from '../dto/create-article.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class RelationsExistsPipe
  implements PipeTransform<CreateArticleDto, Promise<CreateArticleDto>>
{
  constructor(private readonly prisma: PrismaService) {}
  async transform(value: CreateArticleDto) {
    if (value.images.length) {
      const files = await this.prisma.file.findMany({
        where: { id: { in: value.images } },
      });
      if (value.images.some((el) => !files.map((el) => el.id).includes(el)))
        throw new BadRequestException('File does not exist');
    }
    if (value.sale) {
      const sale = await this.prisma.sale.findUnique({
        where: { id: value.sale },
      });
      if (!sale) throw new BadRequestException('Sale does not exist');
    }
    if (value.reviews) {
      const reviews = await this.prisma.review.findMany({
        where: { id: { in: value.reviews } },
      });
      if (value.reviews.some((el) => !reviews.map((el) => el.id).includes(el)))
        throw new BadRequestException('Review does not exist');
    }
    return value;
  }
}
