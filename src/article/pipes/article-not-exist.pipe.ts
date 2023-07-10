import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
interface Name {
  name: string;
}
@Injectable()
export class ArticleNotExistPipe implements PipeTransform<Name, Promise<Name>> {
  constructor(private readonly pisma: PrismaService) {}

  async transform(value: Name, metadata: ArgumentMetadata) {
    const fromDB = await this.pisma.article.findUnique({
      where: { name: value.name },
    });
    if (fromDB) throw new BadRequestException('Article already exist');
    return value;
  }
}
