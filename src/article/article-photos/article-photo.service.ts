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

  public add(files: Express.Multer.File[]): Promise<ArticlePhoto[]> {
    return Promise.all(
      files.map(async (file) => {
        const data = await this.s3Service.addFile(file);
        return new ArticlePhoto(
          await this.prisma.file.create({
            data,
          }),
        );
      }),
    );
  }

  public async getFile(id: number): Promise<ArticlePhoto> {
    const value = await this.prisma.file.findUnique({ where: { id } });

    if (!value) {
      throw new NotFoundException('File not found');
    }

    return new ArticlePhoto(value);
  }

  public async remove(id: number): Promise<ArticlePhoto> {
    const ent = await this.prisma.file.findUnique({ where: { id } });
    if (!ent) {
      throw new NotFoundException();
    }
    await this.s3Service.removeFile(ent.name);

    return new ArticlePhoto(await this.prisma.file.delete({ where: { id } }));
  }
}
