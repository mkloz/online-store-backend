import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateCartItemDto } from '../dto/create-cart-item.dto';

@Injectable()
export class CartRelationsExistsPipe
  implements PipeTransform<CreateCartItemDto, Promise<CreateCartItemDto>>
{
  constructor(private readonly prisma: PrismaService) {}

  async checkUserExistance(articleId?: number) {
    if (articleId) {
      const article = await this.prisma.article.findUnique({
        where: { id: articleId },
      });
      if (!article) throw new BadRequestException('Article does not exist');
    }
  }

  async transform(value: CreateCartItemDto) {
    await this.checkUserExistance(value.article);

    return value;
  }
}
