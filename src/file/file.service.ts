import { Injectable, NotFoundException } from '@nestjs/common';
import { File } from './file.entity';
import { FileS3Service } from './aws/file-s3.service';
import { ID } from 'src/common/common.interface';
import { PrismaService } from 'src/db/prisma.service';
@Injectable()
export class FileService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly s3Service: FileS3Service,
  ) {}

  public add(files: Express.Multer.File[]): Promise<File[]> {
    return Promise.all(
      files.map(async (file) => {
        const data = await this.s3Service.addFile(file);
        return await this.prisma.file.create({
          data,
        });
      }),
    );
  }

  public async getFile(id: number): Promise<File> {
    const value = await this.prisma.file.findUnique({ where: { id } });

    if (!value) {
      throw new NotFoundException('File not found');
    }

    return value;
  }

  public async remove(id: number): Promise<ID> {
    const ent = await this.prisma.file.findUnique({ where: { id } });
    if (!ent) {
      throw new NotFoundException();
    }
    await this.s3Service.removeFile(ent.name);
    await this.prisma.file.delete({ where: { id } });

    return { id };
  }
}
