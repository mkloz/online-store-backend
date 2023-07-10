import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { ID } from 'src/common/common.interface';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class ArticleExistPipe implements PipeTransform<ID, Promise<ID>> {
  constructor(private readonly pisma: PrismaService) {}
  async transform(value: ID, metadata: ArgumentMetadata) {
    const fromDB = await this.pisma.article.findUnique({
      where: { id: value.id },
    });
    if (!fromDB) throw new NotFoundException('Article does not exist');
    return value;
  }
}
