import {
  Controller,
  Post,
  Param,
  Delete,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  Get,
  UploadedFiles,
  ParseFilePipe,
  UseGuards,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ArticlePhotoService } from './article-photo.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IDDto } from '@shared/dto';
import { ApiCreateFiles } from './docs/api-create-files.decorator';
import { FilesValidator } from './validators/article-photo.validator';
import { ApiRemoveFile } from './docs/api-remove-file.decorator';
import { ApiGetFile } from './docs/api-get-file.decorator';
import { ApiFile } from './docs/api-file.decorator';
import { RoleAuthGuard } from '@shared/guards';
import { Roles } from '@shared/decorators';
import { Role } from '@prisma/client';
import { ArticlePhoto } from './article-photo.entity';

export const ARTICLE_FILES_FIELD = 'files';
export const FIVE_MEGABYTES = 5000000;

@ApiFile()
@Controller('files')
@UseInterceptors(ClassSerializerInterceptor)
export class ArticlePhotoController {
  public static readonly TYPE_OF_FILES = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/svg',
    'image/svgz',
    'image/webp',
    'image/tiff',
    'image/tif',
    'image/bmp',
  ];
  public static MAX_FILE_SIZE = FIVE_MEGABYTES;
  public static MAX_COUNT_FILES = 10;

  public constructor(private readonly fileService: ArticlePhotoService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(RoleAuthGuard)
  @ApiCreateFiles()
  @UseInterceptors(
    FilesInterceptor(
      ARTICLE_FILES_FIELD,
      ArticlePhotoController.MAX_COUNT_FILES,
    ),
  )
  public create(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FilesValidator({
            maxSize: ArticlePhotoController.MAX_FILE_SIZE,
            mimetypes: ArticlePhotoController.TYPE_OF_FILES,
          }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ): Promise<ArticlePhoto[]> {
    return this.fileService.add(files);
  }

  @Get(':id')
  @ApiGetFile()
  public get(@Param() dto: IDDto): Promise<ArticlePhoto> {
    return this.fileService.getFile(dto.id);
  }

  @Delete(':id')
  @ApiRemoveFile()
  @UseGuards(RoleAuthGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  public remove(@Param() { id }: IDDto): Promise<ArticlePhoto> {
    return this.fileService.remove(id);
  }
}
