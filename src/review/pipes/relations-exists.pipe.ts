import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateReviewDto } from '../dto/create-review.dto';

@Injectable()
export class RelationsExistsPipe
  implements PipeTransform<CreateReviewDto, Promise<CreateReviewDto>>
{
  constructor(private readonly prisma: PrismaService) {}
  async transform(value: CreateReviewDto) {
    if (value.article) {
      const article = await this.prisma.article.findUnique({
        where: { id: value.article },
      });
      if (!article) throw new BadRequestException('Article does not exist');
    }

    return value;
  }
}
