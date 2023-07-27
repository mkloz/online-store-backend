import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticlePhoto } from './article-photo.entity';
import { ArticlePhotoS3Service } from '@shared/aws/s3/article-photo.service';
import { PrismaService } from '@db/prisma.service';

@Injectable()
export class ArticlePhotoService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly s3Service: ArticlePhotoS3Service,
  ) {}
  static fileNotFound = new NotFoundException('Article photo does not found');

  public async add(
    id: number,
    files: Express.Multer.File[],
  ): Promise<ArticlePhoto[]> {
    return Promise.all(
      files.map(async (file) => {
        const data = await this.s3Service.addFile(file);
        const photo = await this.prisma.articlePhoto.create({
          data: { name: data.name, url: data.url, articleId: id },
        });

        if (!photo) throw ArticlePhotoService.fileNotFound;

        return new ArticlePhoto(photo);
      }),
    );
  }

  public async getFile(id: number): Promise<ArticlePhoto> {
    const value = await this.prisma.articlePhoto.findUnique({ where: { id } });

    if (!value) throw ArticlePhotoService.fileNotFound;

    return new ArticlePhoto(value);
  }

  public async remove(id: number): Promise<ArticlePhoto> {
    const ent = await this.prisma.articlePhoto.findUnique({ where: { id } });
    if (!ent) {
      throw new NotFoundException();
    }
    await this.s3Service.removeFile(ent.name);
    const photo = await this.prisma.articlePhoto.delete({ where: { id } });

    if (!photo) throw ArticlePhotoService.fileNotFound;

    return new ArticlePhoto(photo);
  }
}
