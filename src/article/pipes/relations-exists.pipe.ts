import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { CreateArticleDto } from '../dto/create-article.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class RelationsExistsPipe
  implements PipeTransform<CreateArticleDto, Promise<CreateArticleDto>>
{
  constructor(private readonly prisma: PrismaService) {}
  async transform(value: CreateArticleDto, metadata: ArgumentMetadata) {
    if (!value.images.length) {
      return value;
    }
    const files = await this.prisma.file.findMany({
      where: { id: { in: value.images } },
    });
    Logger.log(files);
    Logger.log(value.images);
    if (value.images.some((el) => !files.map((el) => el.id).includes(el)))
      throw new BadRequestException('File does not exist');

    return value;
  }
}
