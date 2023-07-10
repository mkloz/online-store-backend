import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateSaleDto } from '../dto/create-sale.dto';

@Injectable()
export class RelationsExistsPipe
  implements PipeTransform<CreateSaleDto, Promise<CreateSaleDto>>
{
  constructor(private readonly prisma: PrismaService) {}
  async transform(value: CreateSaleDto) {
    if (!value.article) {
      return value;
    }
    const article = await this.prisma.article.findUnique({
      where: { id: value.article },
    });
    if (!article) throw new BadRequestException('Article does not exist');

    return value;
  }
}
